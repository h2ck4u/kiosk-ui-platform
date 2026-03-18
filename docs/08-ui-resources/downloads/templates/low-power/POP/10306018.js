function screen_on_load()
{

}

function btn_Close_on_mouseup(objInst)
{
    var nReturn = "TR";

    // nReturn 값은 팝업 화면을 로드한 화면의 
    // on_popupdestory 이벤트의 result 파라미터 값 또는
    // domoal을 사용한 경우에는 domoal API 리턴값으로 전달된다.
	screen.unloadpopup(nReturn);
}

function btn_Ok_on_mouseup(objInst)
{
    var nReturn = "FA";

    // nReturn 값은 팝업 화면을 로드한 화면의 
    // on_popupdestory 이벤트의 result 파라미터 값 또는
    // domoal을 사용한 경우에는 domoal API 리턴값으로 전달된다.
	screen.unloadpopup(nReturn);
	
}