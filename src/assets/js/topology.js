import router from "@/router";
import * as echarts from "echarts";
import { ref } from "vue";
import { api } from "../../apis/api";
var label;
var datas, nssi_num;
let NSViewChartContent = ref();
function show_nssi(dom, unmount) {
  var myChart;
  function myChartResize() {
    myChart.resize();
  }
  if (unmount) {
    window.removeEventListener("resize", myChartResize);
  } else {
    myChart = echarts.init(dom);
    window.addEventListener("resize", myChartResize);
    return myChart;
  }
}

function nssiContent(myChart, id) {
  let nssiId;
  if (id) {
    nssiId = `/${id}/`;
  } else {
    nssiId = "/";
  }
  api
    .nssiTopology()
    .showNssi(nssiId)
    .then((response) => {
      if (response.data.length) {
        for (var i = 1; i < response.data.length; i++) {
          var node_tal = response.data[0].nodes;
          var node = response.data[i].nodes;
          response.data[0].nodes = node_tal.concat(node);
          var link_tal = response.data[0].links;
          var link = response.data[i].links;
          response.data[0].links = link_tal.concat(link);
        }
        datas = response.data[0];
        nssi_num = response.data.length;
      } else {
        nssi_num = 1;
        datas = response.data;
      }

      var categories = [];
      datas.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.category = node.attributes.modularity_class;
        node.value = node.category;
        // Use random x,y
        node.x = node.y = null;
        node.draggable = true;
      });

      categories[0] = {
        name: "NSSI",
      };
      categories[1] = {
        name: "VNF",
        itemStyle: {
          color: "rgb(55, 206, 13)",
        },
      };

      label = false;
      myChart.setOption({
        tooltip: {},
        legend: [
          {
            data: categories.map(function (a) {
              return a.name;
            }),
            selected: {
              NSI: false,
              VNF: false,
            },
          },
        ],
        animation: false,
        series: [
          {
            type: "graph",
            layout: "force",
            data: datas.nodes,
            links: datas.links,
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [5, 10],
            categories: categories,
            roam: true,
            label: {
              show: true,
              position: "bottom",
              color: "rgba(0, 0, 0, 1)",
            },
            lineStyle: {
              color: "source",
            },
            emphasis: {
              lineStyle: {
                width: 10,
              },
            },
            force: {
              repulsion: 100,
            },
          },
        ],
      });
      if (!response.data.length) {
        myChart.setOption({
          legend: [
            {
              selected: {
                NSI: true,
                VNF: true,
              },
            },
          ],
        });
      }
      NSViewChartContent.value = [`Total NSSI: ${nssi_num}`];
    });
}

function deallocate_nssi_topology(myChart, nssiID) {
  api
    .nssiTopology()
    .showNssiTopology(nssiID)
    .then((response) => {
      console.log(response);
      if (response.data.length) {
        for (var i = 1; i < response.data.length; i++) {
          var node_tal = response.data[0].nodes;
          var node = response.data[i].nodes;
          response.data[0].nodes = node_tal.concat(node);
          var link_tal = response.data[0].links;
          var link = response.data[i].links;
          response.data[0].links = link_tal.concat(link);
        }
        datas = response.data[0];
        nssi_num = response.data.length;
      } else {
        nssi_num = 1;
        datas = response.data;
      }
      var categories = [];
      datas.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.category = node.attributes.modularity_class;
        node.value = node.category;
        // Use random x,y
        node.x = node.y = null;
        node.draggable = true;
      });
      categories[0] = {
        name: "NSSI",
      };
      categories[1] = {
        name: "VNF",
        itemStyle: {
          color: "rgb(55, 206, 13)",
        },
      };
      label = false;
      myChart.setOption({
        tooltip: {},
        legend: [
          {
            data: categories.map(function (a) {
              return a.name;
            }),
            selected: {
              NSI: false,
              VNF: false,
            },
          },
        ],
        animation: false,
        series: [
          {
            type: "graph",
            layout: "force",
            data: datas.nodes,
            links: datas.links,
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10], //[5,10]
            categories: categories,
            roam: true,
            label: {
              show: true,
              position: "bottom",
              color: "rgba(0, 0, 0, 1)",
            },
            lineStyle: {
              color: "source",
            },
            emphasis: {
              lineStyle: {
                width: 10,
              },
            },
            force: {
              repulsion: 100,
            },
          },
        ],
      });
      if (!response.data.length) {
        myChart.setOption({
          legend: [
            {
              selected: {
                NSI: true,
                VNF: true,
              },
            },
          ],
        });
      }
      NSViewChartContent.value = [`Total NSSI: ${nssi_num}`];
      delete_vnf(myChart, datas.nodes, nssiID);
    });
}

async function allocate_nssi(myChart, nsstID) {
  // return new Promise(resolve => {
  //   console.log(resolve)
  // myChart.showLoading();
  const json = JSON.stringify({
    attributeListIn: { nsstid: nsstID, using_existed: "" },
  });
  // console.log(json);
  var nssiID;
  await api
    .nssiTopology()
    .allocateNssi(json)
    .then((response) => {
      nssiID = response.data.nSSIId;
    })
    .catch(() => {
      // alert("ERROR!!");
    });
  return nssiID;
}

// function returnNssiID(nssiID) {
//   return
// }

function show_allocate_nssi_topology(myChart, nssiID) {
  api
    .nssiTopology()
    .showNssiTopology(nssiID)
    .then((response) => {
      myChart.hideLoading();
      console.log(response);
      if (response.data.length) {
        for (var i = 1; i < response.data.length; i++) {
          var node_tal = response.data[0].nodes;
          var node = response.data[i].nodes;
          response.data[0].nodes = node_tal.concat(node);
          var link_tal = response.data[0].links;
          var link = response.data[i].links;
          response.data[0].links = link_tal.concat(link);
        }
        datas = response.data[0];
        nssi_num = response.data.length;
      } else {
        nssi_num = 1;
        datas = response.data;
      }
      var categories = [];
      datas.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.category = node.attributes.modularity_class;
        node.value = node.category;
        // Use random x,y
        node.x = node.y = null;
        node.draggable = true;
      });

      categories[0] = {
        name: "NSSI",
      };
      categories[1] = {
        name: "VNF",
        itemStyle: {
          color: "rgb(55, 206, 13)",
        },
      };
      categories[2] = {
        name: "MEC",
        itemStyle: {
          color: "rgb(160, 0, 160)",
        },
      };
      categories[3] = {
        name: "MECAPP",
        itemStyle: {
          color: "rgb(14, 241, 241)",
        },
      };

      myChart.setOption({
        tooltip: {},
        legend: [
          {
            data: categories.map(function (a) {
              return a.name;
            }),
            selected: {
              NSI: false,
              VNF: false,
            },
          },
        ],
        animation: false,
        series: [
          {
            type: "graph",
            layout: "force",
            data: datas.nodes,
            links: datas.links,
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            categories: categories,
            roam: true,
            label: {
              show: true,
              position: "bottom",
              color: "rgba(0, 0, 0, 1)",
            },
            lineStyle: {
              color: "source",
            },
            emphasis: {
              lineStyle: {
                width: 10,
              },
            },
            force: {
              repulsion: 100,
            },
          },
        ],
      });
      if (!response.data.length) {
        myChart.setOption({
          legend: [
            {
              selected: {
                NSI: true,
                VNF: true,
              },
            },
          ],
        });
      }
      NSViewChartContent.value = [`Total NSSI: ${nssi_num}`];
    });
}

function delete_vnf(myChart, nodes, nssiID) {
  api
    .nssiTopology()
    .delete(nssiID)
    .then(() => {
      for (let i = nodes.length - 1; i >= 1; i--) {
        setTimeout(function () {
          nodes.pop();
          reload_nssi_topology(myChart, nodes);
          if (nodes.length == 1) {
            alert("NSSI Deallocate Success");
            router.push({
              name: "NSS_Instance",
            });
          }
        }, i * 1000);
      }
    })
    .catch(() => {
      alert("NSSI in not allocated");
      router.push({
        name: "NSS_Instance",
      });
    });
}

function myChartDbclick(myChart) {
  myChart.on("dblclick", function () {
    NSViewChartContent.value = [`Total NSSI: ${nssi_num}`];
  });
}

function myChartClick(myChart) {
  var nssi_switched = 0;
  myChart.on("click", { dataType: "node" }, function (params) {
    switch (params.data.attributes.modularity_class) {
      case 1:
        NSViewChartContent.value = [
          `VNF id: ${params.data.id}`,
          `VNF name: ${params.name}`,
          `Address: ${params.data.address}`,
          `VNF State: ${params.data.vnfState}`,
          `Instantiation: ${params.data.instantiationState}`,
        ];
        break;
      case 0:
        NSViewChartContent.value = [
          `NSSI id: ${params.data.id}`,
          `NSSI name: ${params.name}`,
        ];
        nssi_switched = !nssi_switched;
        label = !label;
        if (nssi_switched) {
          api
            .nssiTopology()
            .nssiSwitched(params.data.id)
            .then((response) => {
              var datas = response.data;
              // var categories = [];
              datas.nodes.forEach(function (node) {
                node.itemStyle = null;
                node.category = node.attributes.modularity_class;
                node.value = node.category;
                // Use random x,y
                node.x = node.y = null;
                node.draggable = true;
              });
              myChart.setOption({
                legend: [
                  {
                    selected: {
                      NSI: label,
                      VNF: label,
                    },
                  },
                ],
                series: [
                  {
                    data: datas.nodes,
                    links: datas.links,
                  },
                ],
              });
            });
          NSViewChartContent.value = [
            `NSSI id: ${params.data.id}`,
            `NSSI name: ${params.name}`,
          ];
        } else {
          myChart.setOption({
            legend: [
              {
                selected: {
                  NSI: label,
                  VNF: label,
                },
              },
            ],
            series: [
              {
                data: datas.nodes,
                links: datas.links,
              },
            ],
          });
          NSViewChartContent.value = [`Total NSSI: ${nssi_num}`];
        }
        break;
    }
  });
}

async function reload_nssi_topology(myChart, nodes) {
  myChart.setOption({
    series: [
      {
        type: "graph",
        layout: "force",
        data: nodes,
        edgeSymbol: ["circle", "arrow"],
        edgeSymbolSize: [4, 10],
        roam: true,
        label: {
          show: true,
          position: "bottom",
          color: "rgba(0, 0, 0, 1)",
        },
        lineStyle: {
          color: "source",
        },
        emphasis: {
          lineStyle: {
            width: 10,
          },
        },
        force: {
          repulsion: 100,
        },
      },
    ],
  });
}
export {
  show_nssi,
  nssiContent,
  myChartDbclick,
  myChartClick,
  deallocate_nssi_topology,
  allocate_nssi,
  NSViewChartContent,
  show_allocate_nssi_topology,
};
