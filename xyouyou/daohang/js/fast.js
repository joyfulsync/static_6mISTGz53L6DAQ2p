function fastparam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return '';
    }

var xcode=fastparam('xcode')

if(xcode)
{
    localStorage.setItem("wwid",xcode)
}