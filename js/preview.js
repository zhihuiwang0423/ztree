
    var previewData = JSON.parse(localStorage.getItem('previewData'))
        console.log(previewData)
    $('#main').width(10*300); // 最底层叶子节点数值*300
    $('#main').height(previewData[0].children.length*200); // 多少层级
    // $('#main').width(window.innerWidth-50)
    // $('#main').height(window.innerHeight-50)
    console.log($('#main').height())
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        option = {
          calculable : true,
          toolbox: {
            show: true,
            　　feature: {
            　　　　saveAsImage: {
                       type: 'jpeg',
                　　　　show:true,
                　　　　excludeComponents :['toolbox'],
                　　　　pixelRatio: 2
            　　　　}
            　　}
            },
          series : [
              {
                  name:'树图',
                  type:'tree',
                  orient: 'vertical',  // vertical horizontal radial
                  rootLocation: {x:'left', y: '120px'}, // 根节点位置  {x: 'center',y: 10}
                  // direction:'inverse',
                  roam:true, // 是否开启滚轮放大缩小
                  layerPadding:100,
                  nodePadding: 60,
                  symbol: 'none',// circle' | 'rectangle' | 'triangle' | 'diamond' |
                  //'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
                  symbolSize: [190, 50],
                  itemStyle: {
                      normal: {
                          label: {
                            show: true,
                            position: 'inside',
                            textStyle: {
                                color: '#111',
                                fontSize: 12,
                                fontWeight:  'bolder'
                            }
                          },
                          lineStyle: {
                              color: '#0f8',
                              width: 1.5,
                              type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                          },
                          areaStyle: {
                            color: '#dd9'
                          },
                          labelLine: {
                            show: true,
                            lineStyle: {
                                color: 'red',
                                length: 20
                            }
                        }
                      },
                      emphasis: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                      }
                  },
                  data:[previewData[0]],
                //   data: [
                //       {
                //           name: '卓朗科技\n有限公司\n智慧',
                //           children: [
                //           {
                //                   name: '一级一级一\n级一级一级一级\n一级一级一级',
                //                   children: [
                //                       {
                //                           name: '一级一级一级一级一级一级一级一级一级一级一级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '一级',
                //                   children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '一级',
                //                   children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '一级',
                //                   children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '一级',
                //                   children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '一级',
                //                   children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '一级',
                //                   children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '一级',
                //                   children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '苹果',
                //                   children: [
                //                       {
                //                           name: '二级',
                //                           children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '华为',
                //                   children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                           children: [
                //                       {
                //                           name: '二级',
                //                           children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                           children: [
                //                       {
                //                           name: '二级',
                //                           children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                           children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                           children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //                       },
                //                       {
                //                           name: '小米2',
                //                           children: [
                //                       {
                //                           name: '二级',
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //                       },
                //                       {
                //                           name: '小米2',
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //                       },
                //                       {
                //                           name: '小米3',
                //                       }
                //                   ]
                //               },
                //               {
                //                   name: '联想',
                //               }
                //           ]
                //       }
                //   ]
              }
          ]
        };
                          
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
