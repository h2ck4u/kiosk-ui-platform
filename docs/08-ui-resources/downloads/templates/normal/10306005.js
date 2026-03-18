function screen_on_load()
{
	
}
//두번째 슬라이드로 화면이동
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveat(1);	
}
//주민등록버튼 클릭시 다음 슬라이드로 이동, 다른 버튼들은 다다음 슬라이드로 이동
function btn_Finger_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let itemNm = sld.getcustomprop("resNm");

	//20240117 추가 초본 등본의 이름을 가져와서 비교한다 
	if(itemNm == 2 || itemNm == 3) {
		sld.setfocus();
		this.fn_ChangeText();
		sld.movenext();
	} else {
		sld.setfocus();
		sld.moveat(5);
	}
}
//취소버튼 클릭시 첫번째 슬라이드로 이동
function btn_Cancle_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveat(0);
}
//홈으로 이동
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();
}
//접근성 팝업창 실행하는 버튼
function btn_Acc_on_mouseup(objInst)
{
	factory.loadpopupex("무인민원발급기접근성(팝업)", "/BIZ/103/06/POP/10306019", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);	
}
//직원호출 버튼
function btn_Call_on_mouseup(objInst)
{
	 screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}

//등본,초본 값을 가져오는 콜백 함수
function fn_ChangeText()
{
   let parentScr = this.screen.getparent();   
   let sld = parentScr.getinstancebyname("SV_Template");
   let i,tab;
	//팝업의 초본,등본 이름값
   let popNm = sld.getcustomprop("resNm");

   for(i = 0; i < sld.getitemcount() ; i++){
      tab = sld.getchildinstancefirst(i);
      //신청증명서 찾기
      documentObj = tab.getchildinstancebyname(0,"txt_Doc");
   
      if(documentObj != null){
        if(popNm == 2){
            documentObj.settext("주민등록표(초본)의 내용");
        } else {
            documentObj.settext("주민등록표(등본)의 내용");
      }
   }
   }
}