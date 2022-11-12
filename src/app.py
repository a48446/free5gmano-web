import os
import uuid
import json
import base64
from typing import Dict
from flask import Flask, render_template, request, Response
from webauthn import (
    generate_registration_options,
    verify_registration_response,
    generate_authentication_options,
    verify_authentication_response,
    options_to_json,
)
from webauthn.helpers.structs import (
    AuthenticatorSelectionCriteria,
    UserVerificationRequirement,
    RegistrationCredential,
    AuthenticationCredential,
)
from webauthn.helpers.cose import COSEAlgorithmIdentifier

app = Flask(__name__)

# rp_id = "zero-trust-test.nutc-imac.com"
# origin = "https://zero-trust-test.nutc-imac.com"

rp_id = "localhost"
origin = "http://localhost"
rp_name = "ubuntu"


current_registration_challenge = None
current_authentication_challenge = None


class person_control(object):
    @app.route("/account", methods=["POST"])
    def add_id():
        global user_id
        global logged_in_user_id

        user_data = request.get_data()
        user = json.loads(user_data.decode("utf-8"))
        user_id = user["account"]
        username = f"{user_id}@{rp_id}"
        logged_in_user_id = user_id

        user_tmp_data = {"id": user_id, "username": username, "credentials": []}

        user_data = {
            user_id : user_tmp_data
        }

        with open("database.json", "w") as f:
            f.write(json.dumps(user_data))

        status = {"status": "user add success"}

        print(status)

        return status


@app.route("/")
def index():
    username = "012345"
    context = {
        "username": username,
    }

    return render_template("index.html", **context)


@app.route("/generate-registration-options", methods=["GET"])
def registerFidoOptions():
    global current_registration_challenge
    global logged_in_user_id

    with open("database.json", "r") as f:
        user = json.load(f)[user_id]
    
    options = generate_registration_options(
        rp_id=rp_id,
        rp_name=rp_name,
        user_id=user["id"],
        user_name=user["username"],
        exclude_credentials=[
            {"id": cred.id, "transports": cred.transports, "type": "public-key"}
            for cred in user["credentials"]
        ],
        authenticator_selection=AuthenticatorSelectionCriteria(
            user_verification=UserVerificationRequirement.REQUIRED
        ),
        supported_pub_key_algs=[COSEAlgorithmIdentifier.ECDSA_SHA_256],
    )
    
    current_registration_challenge = options.challenge
    
    return options_to_json(options)


# verify-registration-response
# @app.route("/registerOptionResponse", methods=["POST"])
@app.route("/verify-registration-response", methods=["POST"])
def registerOptionResponse():
    global current_registration_challenge
    global logged_in_user_id
    global verification

    body = request.get_data()

    try:
        credential = RegistrationCredential.parse_raw(body)
        verification = verify_registration_response(
            credential=credential,
            expected_challenge=current_registration_challenge,
            expected_rp_id=rp_id,
            expected_origin=origin,
        )
       
    except Exception as err:
        print(err)
        return {"verified": False, "msg": str(err), "status": 400}

    with open("database.json", "r") as f:
        user = json.load(f)[user_id]
    
    credential_data = {
        "id":str(verification.credential_id).replace("b'","").replace("'",""),
        "public_key":str(verification.credential_public_key).replace("b'","").replace("'",""),
        "sign_count":verification.sign_count,
        "transports":json.loads(body).get("transports", [])
    }
    
    user["credentials"] = [credential_data]
    
    with open("database.json", "w") as f:
            f.write(json.dumps(user))

    return {"verified": True, "username": user}


# @app.route("/sigInOptionRequest", methods=["GET"])
@app.route("/generate-authentication-options", methods=["GET"])
def sigInOptionRequest():
    global current_authentication_challenge
    global logged_in_user_id

    with open("database.json", "r") as f:
        user = json.load(f)    

    signin_user =  user["credentials"][0]
    user_id = str.encode(signin_user["id"])
    user_id = user_id.decode('unicode-escape').encode('latin-1')

    options = generate_authentication_options(
        rp_id=rp_id,
        allow_credentials=[
            {"type": "public-key", "id": user_id, "transports": signin_user["transports"]}
        ],
        user_verification=UserVerificationRequirement.REQUIRED,
    )
    
    current_authentication_challenge = options.challenge
    return options_to_json(options)


@app.route("/verify-authentication-response", methods=["POST"])
def hander_verify_authentication_response():
    global current_authentication_challenge
    global logged_in_user_id

    body = request.get_data()

    try:

        credential = AuthenticationCredential.parse_raw(body)

        with open("database.json", "r") as f:
            user = json.load(f)

        signin_user =  user["credentials"][0]
        
        # user_credential = None

        # for _cred in user.credentials:
        #     if _cred.id == credential.raw_id:
        #         print("hello")
        #         user_credential = _cred

        # if user_credential is None:
        #     raise Exception("Could not find corresponding public key in DB")

        login_verification = verify_authentication_response(
            credential=credential,
            expected_challenge=current_authentication_challenge,
            expected_rp_id=rp_id,
            expected_origin=origin,
            credential_public_key= verification.credential_public_key,
            credential_current_sign_count=signin_user["sign_count"],
            require_user_verification=True,
        )

    except Exception as err:
        print(err)

        return {"verified": False, "msg": str(err), "status": 400}


    default = {
        "status": "login",
        "verified": True,
        "user_credential.sign_count": login_verification.new_sign_count,
    }

    return default
