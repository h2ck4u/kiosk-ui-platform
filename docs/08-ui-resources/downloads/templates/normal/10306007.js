function screen_on_load()
{
	
}

function btn_prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveprev();
}

function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}

function btn_Issued_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.movenext();
}

function btn_ac_on_mouseup(objInst)
{
	factory.loadpopupex("무인민원발급기접근성(팝업)", "/BIZ/103/06/POP/10306019", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);	
}