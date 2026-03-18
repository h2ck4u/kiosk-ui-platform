function screen_on_load()
{

}
//홈으로 이동
function btn_Home_on_mouseup(objInst)
{
	window.location.reload();	
}
//슬라이드 이전화면으로 이동
function btn_Prev_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	sld.moveprev();	
}
//총 결제금액을 담은 추가함수와 함께 다음 슬라이드뷰로 넘김
function btn_Payment_on_mouseup(objInst)
{
   let parentScr = this.screen.getparent();
   let sld = parentScr.getinstancebyname("SV_Template");
   let objNm = objInst.getname().substr(4);
   let itemNm = objInst.gettext();
   let itemPr = this.screen.getinstancebyname("fld_"+objNm).gettext();

   //아이템의 이름과 가격 세팅
   let itemInfo3 = sld.getcustomprop("itemInfo3");
//   itemInfo3.itemNm = itemNm;
   itemInfo3.itemPr = itemPr;

   sld.setcustomprop("itemInfo3", itemPr);
   sld.setfocus();
	//추가함수
   this.fn_TotalPayment()
   sld.movenext();	
}
//팝업창 실행하는 버튼
function btn_Acc_on_mouseup(objInst)
{
	factory.loadpopupex("무인민원발급기접근성(팝업)", "/BIZ/103/06/POP/10306019", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);	
}
//총합계 값을 가져옴
function fn_TotalPayment()
{
	let parentScr = this.screen.getparent();	
	let sld = parentScr.getinstancebyname("SV_Template");

	let payVal = this.fld_Item0.gettext();
	
	let totalSum = sld.getcustomprop("resPr");
	if(isNaN(totalSum)) totalSum = 0;
	
	let i,tab,totalPay;

	for(i = 0; i < sld.getitemcount() ; i++){
		tab = sld.getchildinstancefirst(i);
		//신청 부수 찾기
		totalPay = tab.getchildinstancebyname(0,"fld_Payment");
		txtTotal = tab.getchildinstancebyname(0,"txt_TotalSum");
		
		if(totalPay != null){
			
			if(totalSum == 0) {
				totalPay.setvisible(false);
				txtTotal.setvisible(true);
			}else {
				totalPay.setvisible(true);
				txtTotal.setvisible(false);
				totalPay.settext(payVal);
			}
		}
	}
}
//직원호출 버튼
function btn_Call_on_mouseup(objInst)
{
	screen.messagebox("직원호출중입니다. 잠시만기다려주세요", "직원호출", 1, 2);
}