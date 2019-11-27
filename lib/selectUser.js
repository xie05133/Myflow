var users = new Array();
function addUser() {
    window.parent.layer.open({
        type: 2,
        title: "请选择处理人类型",
        scrollbar: false,
        shadeClose: true,
        maxmin: false,
        shade: 0.8,
        area: ['350px', '140px'],
        content: 'selectUserType.html', //iframe的url
        success: function (layero, index) {
            var iframeWin = layero.find('iframe')[0], iframeForm = iframeWin.contentWindow.$("form");
            iframeWin.contentWindow.$("#userType").on("change", function () {
                var val = $(this).val(), txt = iframeWin.contentWindow.$("#userType").find(":selected").text();
                call(val, txt);
                window.parent.layer.close(index)
            })
        }
    })


    function call(val, txt) {
        if (selectUser["selectUser" + val]) {
            selectUser["selectUser" + val](val, txt)
        }
    }
    var selectUser = {
        selectUser2: function (ut, txt) {
            //角色
            openSelect('selectRole.html', ut, txt);
        },
        selectUser3: function (ut, txt) {
            //人员
            openSelect('selectUser.html', ut, txt, 820, 470)
        },
        selectUser4: function (ut) {
            //组织

        },
        selectUser5: function (ut) {
            //发起人
            appendUsers([{ userName: '发起人', userType: ut, userId: 0 }])
        },
        selectUser6: function (ut) {
            //发起人上级领导
            appendUsers([{ userName: '发起人上级领导', userType: ut, userId: 0 }])
        }
    }
}

function appendUser(obj) {
    var index = $(".user-select").find(">div").length;
    var user = $(['<div><span>'
        , obj.userName
        , '</span><div class="closebtn"></div>'
        // , '<input type="hidden" name="users[' + index + '][userName]" value="' + obj.userName + '"/>'
        // , '<input type="hidden" name="users[' + index + '][userType]" value="' + obj.userType + '"/>'
        // , '<input type="hidden" name="users[' + index + '][userId]" value="' + obj.userId + '"/>'
        // ,'<input type="hidden" name="users['+index+'][userName]" value="'+obj.userName+'"/>'
        , '</div>'].join(''));
    $(".user-select").append(user);
    console.log(user)
    user.find(".closebtn").on("click", function () {
        user.remove();
        users.some((item, i) => {
            if (item.userId == obj.userId && item.userType == obj.userType) {
                users.splice(i, 1)
            }
        })
        $(".user-select").find(">div").each(function (i) {
            $(this).find("input").each(function () {
                var name = $(this).attr("name")
                if (name) {
                    $(this).attr("name", name.replace(/\[\d+\]/g, "[" + i + "]"));
                }
            })
        })
    })
    obj["dom"] = user;
    users.push(obj);
}

function appendUsers(arry, index, utype) {
    $.each(arry, function (index, obj) {
        if (!users.some(item => {
            if (item.userId == obj.userId && item.userType == obj.userType) {
                return true;
            }
        })) {
            appendUser(obj)
        }
    });
    $.each(users, function (index, obj) {
        if (obj && obj.userType == utype) {
            if (!arry.some(item => {
                if (item.userId == obj.userId && item.userType == obj.userType) {
                    return true;
                }
            })) {
                obj.dom.remove()
                users.splice(index, 1)
            }
        }
    })
    if (index) {
        window.parent.layer.close(index)
    }
}


function openSelect(url, type, txt, width, height) {
    width = width || 350
    height = height || 540
    window.parent.layer.open({
        type: 2,
        title: txt + "选择",
        scrollbar: false,
        shadeClose: true,
        maxmin: false,
        shade: 0.8,
        area: [width + 'px', height + 'px'],
        content: url, //iframe的url
        btn: ["确定", "取消"],
        yes: function (index, layero) {
            var iframeWin = layero.find('iframe')[0];
            iframeWin.contentWindow.submitHandler(iframeWin, appendUsers, index);
        },
        success: function (layero, index) {
            var iframeWin = layero.find('iframe')[0];
            iframeWin.contentWindow.init(users, type, txt);
        }
    })
}