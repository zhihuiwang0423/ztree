var setting = {
        view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            selectedMulti: false
        },
        edit: {
            enable: true,
            editNameSelectAll: true,
            showRemoveBtn: showRemoveBtn,
            showRenameBtn: showRenameBtn
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeDrag: beforeDrag,
            onDrag: zTreeOnDrag,
            beforeEditName: beforeEditName,
            beforeRemove: beforeRemove,
            beforeRename: beforeRename,
            onRemove: onRemove,
            onRename: onRename,
            onClick: zTreeOnClick
        },
        async: {
          enable: true,
          dataType: "text",
          url: "http://host/getNode.php",
          autoParam: ["id", "name"]
        }
    };

zTreeNodes =
 [
    { id:1, pId:0, name:"can drag 1", open:true},
    { id:11, pId:1, name:"can drag 1-1"},
    { id:12, pId:1, name:"can drag 1-2", open:true},
    { id:121, pId:12, name:"can drag 1-2-1"},
    { id:122, pId:12, name:"can drag 1-2-2"},
    { id:123, pId:12, name:"can drag 1-2-3"},
    { id:13, pId:1, name:"can't drag 1-3", open:true, drag:false},
    { id:131, pId:13, name:"can't drag 1-3-1", drag:false},
    { id:132, pId:13, name:"can't drag 1-3-2", open: true},
    {id: 1321, pId: 132, name: "can't drag 1-3-2-1"},
    { id:133, pId:13, name:"can drag 1-3-3",open: true},
    { id:14, pId:1, name:"can't drag 1-4", open:true, drag:false},
    { id:141, pId:14, name:"can't drag 1-4-1", drag:false},
    { id:142, pId:14, name:"can't drag 1-4-2", drag:false},
    { id:143, pId:14, name:"can drag 1-4-3"},
    
    ]
    var log, className = "dark";
    function zTreeOnClick(event, treeId, treeNode) {
      // alert(treeNode.tId + ", " + treeNode.name);
  };
    function zTreeOnDrag(event, treeId, treeNodes) {
        console.log(treeNodes)
    };
    function beforeDrag(treeId, treeNodes) {
        return true;
    }
    function beforeEditName(treeId, treeNode) {
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
        var zTree = $.fn.zTree.getZTreeObj("tree");
        zTree.selectNode(treeNode);
        setTimeout(function() {
            zTree.editName(treeNode);
        }, 0);
        return false;
    }
    function beforeRemove(treeId, treeNode) {
        className = (className === "dark" ? "":"dark");
        showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
        var zTree = $.fn.zTree.getZTreeObj("tree");
        zTree.selectNode(treeNode);
        return confirm("Confirm delete node '" + treeNode.name + "' it?");
    }
    function onRemove(e, treeId, treeNode) {
        showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    }
    function beforeRename(treeId, treeNode, newName, isCancel) {
        className = (className === "dark" ? "":"dark");
        showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
        if (newName.length == 0) {
            setTimeout(function() {
                var zTree = $.fn.zTree.getZTreeObj("tree");
                zTree.cancelEditName();
                alert("Node name can not be empty.");
            }, 0);
            return false;
        }
        return true;
    }
    function onRename(e, treeId, treeNode, isCancel) {
        showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
    }
    function showRemoveBtn(treeId, treeNode) {
        return !treeNode.isFirstNode;
    }
    function showRenameBtn(treeId, treeNode) {
        return !treeNode.isLastNode;
    }
    function showLog(str) {
        debugger
        if (!log) log = $("#log");
        log.append("<li class='"+className+"'>"+str+"</li>");
        if(log.children("li").length > 8) {
            log.get(0).removeChild(log.children("li")[0]);
        }
    }
    function getTime() {
        var now= new Date(),
        h=now.getHours(),
        m=now.getMinutes(),
        s=now.getSeconds(),
        ms=now.getMilliseconds();
        return (h+":"+m+":"+s+ " " +ms);
    }

    var newCount = 1;
    function addHoverDom(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='add node' onfocus='this.blur();'></span>";
        sObj.after(addStr);
        var btn = $("#addBtn_"+treeNode.tId);
        if (btn) btn.bind("click", function(){
            var zTree = $.fn.zTree.getZTreeObj("tree");
            zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
            return false;
        });
    };
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_"+treeNode.tId).unbind().remove();
    };
    
    $(document).ready(function(){
        $.fn.zTree.init($("#tree"), setting, zTreeNodes);
        console.log(zTreeNodes)
        $('#save').click(function(){
            var treeObj = $.fn.zTree.getZTreeObj("tree");
            // var nodes = treeObj.getNodes();
            var nodes =  treeObj.transformToArray(treeObj.getNodes());;
            console.log(nodes)
        })
        $('#preview').click(function(){
          var treeObj = $.fn.zTree.getZTreeObj("tree");
          var nodes = treeObj.getNodes();
          // var nodes =  treeObj.transformToArray(treeObj.getNodes());;
          // console.log(nodes)
          window.localStorage.setItem('previewData', JSON.stringify(nodes))
      })
    });