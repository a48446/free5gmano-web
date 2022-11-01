import Connect from "@/libs/http/apiConfig";

export class tableListApi extends Connect {
  pluginList() {
    return super.get("plugin/management/");
  }
  templateList() {
    return super.get("ObjectManagement/GenericTemplate/");
  }
  // public(){
  //     return super.post('SecurityManagement/template_switch_share/')
  // }
}

export class nssTemplateApi extends Connect {
  selected(TemplateId) {
    return super.get(`ObjectManagement/GenericTemplate/${TemplateId}/`);
  }
  nssTemplateList() {
    return super.get(`ObjectManagement/SliceTemplate/`);
  }
  create(from) {
    return super.post(`ObjectManagement/SliceTemplate/`, from);
  }
  delete(templateId) {
    return super.delete(`/ObjectManagement/SliceTemplate/${templateId}/`);
  }
}
export class genericTemplateApi extends Connect {
  create(from) {
    return super.post(`ObjectManagement/GenericTemplate/`, from);
  }
  update(upId, from) {
    return super.put(`ObjectManagement/GenericTemplate/${upId}/`, from);
  }
  delete(templateId) {
    return super.delete(`ObjectManagement/GenericTemplate/${templateId}/`);
  }
  public(from) {
    return super.post("SecurityManagement/template_switch_share/", from);
  }
}

export class nfvManoPluginApi extends Connect {
  create(from) {
    return super.post(`plugin/management/`, from);
  }
  update(pluginName, from) {
    return super.patch(`plugin/management/${pluginName}/`, from);
  }
  delete(templateId) {
    return super.delete(`plugin/management/${templateId}/`);
  }
  public(from) {
    return super.post("SecurityManagement/plugin_switch_share/", from);
  }
}

export class NSSInstanceApi extends Connect {
  deleteNssi(nssiId) {
    return super.delete(
      `ObjectManagement/NetworkSliceSubnet/${nssiId}/?scope=[%27BASE_NTH_LEVEL%27,0]`
    );
  }
  nssInstanceIist() {
    return super.get(
      `ObjectManagement/NetworkSliceSubnet/*/?scope=[%27BASE_NTH_LEVEL%27,1]`
    );
  }
}

export class nssiTopologyApi extends Connect {
  showNssi(id) {
    return super.get(`ObjectManagement/NSS/topology${id}/`);
  }
  nssiSwitched(paramsId) {
    return super.get(`ObjectManagement/NSS/topology/${paramsId}/`);
  }
  showNssiTopology(id) {
    return super.get(`ObjectManagement/NSS/topology/${id}/`);
  }
  delete(nssiID) {
    return super.delete(`ObjectManagement/NSS/SliceProfiles/${nssiID}/`);
  }
  allocateNssi(json) {
    console.log(json);
    return super.post(`ObjectManagement/NSS/SliceProfiles/`, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
