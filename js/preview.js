
    var previewData = JSON.parse(localStorage.getItem('previewData'))
    // console.log(previewData)
    $('#main').width(10*360); // 最底层叶子节点数值*300
    $('#main').height(previewData[0].children.length*200); // 多少层级
    // $('#main').width(window.innerWidth-20)
    // $('#main').height(window.innerHeight-20)
    // console.log($('#main').height())
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    myChart.showLoading({
        text: '正在努力的读取数据中...',    //loading话术
    });
    
        myChart.hideLoading();
        // 指定图表的配置项和数据
        option = {
          calculable : true,         
          toolbox: {
            show: true,
            x:'left',
            y:'left',
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
                  layerPadding:100, // 层间距
                  nodePadding: 50, // 节点间距
                  symbol: 'none',// circle' | 'rectangle' | 'triangle' | 'diamond' |
                  //'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
                  symbolSize: [260, 50],
                  itemStyle: {
                      normal: {
                        color: '#abc',
                          label: {
                            show: true,                            
                            position: 'inside',
                            textStyle: {
                                color: '#111',
                                fontSize: 12,
                                fontWeight:  'bolder',
                            },
                            formatter:function(v){                               
                                var text=v.name;
                                return  text.length>10?text.substr(0,10)+"...":text;
                             },
                          },                      
                          lineStyle: {
                              color: '#0f8',
                              width: 1.5,
                              type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                          },                       
                      },
                      emphasis: {
                        borderWidth: 0,
                        color: '#abc'
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
