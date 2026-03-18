function screen_on_load()
{

}
//팝업 닫기
function btn_Close_on_mouseup(objInst)
{
    var nReturn = false;

	screen.unloadpopup(nReturn);
}
//팝업 완료
function btn_Ok_on_mouseup(objInst)
{
   let radio = this.btn_Item2.gettext();
   if(radio == 0) {
      screen.messagebox("증명서를 선택해 주세요." , "증명서", 1, 2);      
      return
   }

    var nReturn = true;

   this.transVal();
   screen.unloadpopup(nReturn);
}
//팝업 값 전달 이벤트
function transVal() 
{
	let parentScr = this.screen.getparent().getparent();
	
	let sld = parentScr.getinstancebyname("SV_Template");

	let objRdoVal = btn_Item2.gettext();
	let itemNm,itemPr;
	itemNm = this.screen.getinstancebyname("btn_Item"+objRdoVal).gettext();
	itemPr = parseInt(this.screen.getinstancebyname("txt_Item"+objRdoVal).gettext());
   sld.setcustomprop("resNm", itemNm);
   sld.setcustomprop("resPr", itemPr);
}