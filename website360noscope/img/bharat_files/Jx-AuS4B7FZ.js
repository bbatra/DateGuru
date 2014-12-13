/*!CK:3443280019!*//*1418015522,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["JzMfH"]); }

__d("EgoAdsObjectSet",["DOM","csx"],function(a,b,c,d,e,f,g,h){function i(){"use strict";this._allEgoUnits=[];this._egoUnits=[];}i.prototype.init=function(k){"use strict";this._allEgoUnits=k;this._egoUnits=[];this._allEgoUnits.forEach(function(l){var m=j(l);if(!m||!m.holdout)this._egoUnits.push(l);},this);};i.prototype.getCount=function(){"use strict";return this._egoUnits.length;};i.prototype.forEach=function(k,l){"use strict";this._egoUnits.forEach(k,l);};i.prototype.getUnit=function(k){"use strict";return this._egoUnits[k];};i.prototype.getHoldoutAdIDsForSpace=function(k,l){"use strict";if(!k||!l)return [];var m=[];for(var n=0;k>0&&n<this._allEgoUnits.length;n++){var o=this._allEgoUnits[n],p=l(o),q=j(o);if(k>=p&&q&&q.holdout)m.push(q.adid);k-=p;}return m;};i.prototype.getHoldoutAdIDsForNumAds=function(k){"use strict";k=Math.min(k,this._allEgoUnits.length);var l=[];for(var m=0;m<k;m++){var n=this._allEgoUnits[m],o=j(n);if(o&&o.holdout)l.push(o.adid);}return l;};function j(k){var l=g.scry(k,"div._4u8")[0],m=l&&l.getAttribute('data-ad');return m&&JSON.parse(m)||(void 0);}e.exports=i;},null);
__d("rayInterceptsBox",["invariant"],function(a,b,c,d,e,f,g){function h(j,k){var l=Object.keys(j);k.forEach(function(m){g(l.indexOf(m)!==-1);g(typeof j[m]==='number');});}var i={check:function(j,k){h(j,['minX','maxX','minY','maxY']);h(k,['x','y','dx','dy']);g(j.maxX>j.minX&&j.maxY>j.minY);if(k.dx===0&&k.dy===0)return false;if(k.x>=j.minX&&k.x<=j.maxX&&k.y>=j.minY&&k.y<=j.maxY)return true;var l=(j.minX-k.x)/k.dx,m=(j.maxX-k.x)/k.dx,n=(j.minY-k.y)/k.dy,o=(j.maxY-k.y)/k.dy,p=Math.max(Math.min(l,m),Math.min(n,o)),q=Math.min(Math.max(l,m),Math.max(n,o));if(p<0)return false;if(p>q)return false;return true;}};e.exports=i;},null);
__d("AdsMouseStateStore",["Arbiter","DOM","Event","Vector","$","copyProperties","invariant","keyMirror","rayInterceptsBox","throttle"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){"use strict";var q=30,r=500,s=n({STATIONARY:null,INTENT:null,HOVER:null,NO_INTENT:null}),t,u,v,w,x;function y(){t=s.STATIONARY;u=0;v=0;w=Date.now();x='pagelet_ego_pane';}y();function z(event){try{return {x:event.clientX||event.x,y:event.clientY||event.y};}catch(ba){var ca=Math.random()*1000;return {x:ca,y:ca};}}var aa=l(new g(),{getState:function(){return t;},updateRhcID:function(ba){m(k(ba));x=ba;},getRhcID:function(){return x;},onPageTransition:function(event){y();},onMouseMove:function(event){this.calculateState(z(event));},__updateMousePos:function(ba){u=ba.x;v=ba.y;},isRhcPresent:function(){if(!h.scry(document.body,'#'+x).length)return false;var ba=this.getRhcDimensions();return (ba.y>0&&ba.x>0);},getRhc:function(){return k(x);},getRhcPosition:function(){return j.getElementPosition(this.getRhc());},getRhcScreenPos:function(){var ba=j.getScrollPosition(),ca=this.getRhcPosition();return {x:ca.x-ba.x,y:ca.y-ba.y};},getRhcDimensions:function(){return j.getElementDimensions(this.getRhc());},getRhcBoundingBox:function(){var ba=this.getRhcDimensions(),ca=this.getRhcScreenPos();return {minX:ca.x,maxX:ca.x+ba.x,minY:ca.y,maxY:ca.y+ba.y};},isPosContainedInRhc:function(ba){var ca=this.getRhcBoundingBox();return (ba.x>=ca.minX&&ba.x<=ca.maxX&&ba.y>=ca.minY&&ba.y<=ca.maxY);},hasMovedMinDistance:function(ba){var ca=ba.x-u,da=ba.y-v;return (ca*ca+da*da)>=q*q;},tooSoon:function(){return Date.now()-w<r;},_updateTime:function(){w=Date.now();},calculateState:function(ba){if(this.tooSoon())return;this._updateTime();if(!this.isRhcPresent())return;if(this.isPosContainedInRhc(ba)){this.transitionToState(s.HOVER);this.__updateMousePos(ba);this.scheduleCheckup();return;}else if(!this.hasMovedMinDistance(ba)){this.transitionToState(s.STATIONARY);return;}var ca=(this.isMovingTowardsRhc(ba))?s.INTENT:s.NO_INTENT;this.transitionToState(ca);this.__updateMousePos(ba);this.scheduleCheckup();},isMovingTowardsRhc:function(ba){var ca={x:u,y:v};if(this.isPosContainedInRhc(ca))return true;var da=this.getRhcBoundingBox(),ea={x:u,y:v,dx:ba.x-u,dy:ba.y-v};return o.check(da,ea);},scheduleCheckup:function(){var ba={x:u,y:v};setTimeout(function(){this.calculateState(ba);}.bind(this),r*1.5);},transitionToState:function(ba){if(ba===t)return;t=ba;aa.inform('change');}});i.listen(document,'mousemove',p(aa.onMouseMove.bind(aa),r));g.subscribe('page_transition',aa.onPageTransition);aa.STATES=s;aa.MIN_MOVE_DISTANCE=q;aa.THROTTLE_TIME=r;e.exports=aa;},null);
__d("coalesce",[],function(a,b,c,d,e,f){function g(){for(var h=0;h<arguments.length;++h)if(arguments[h]!=null)return arguments[h];return null;}e.exports=g;},null);
__d("BookmarkFeedSorter",["Run"],function(a,b,c,d,e,f,g){var h,i={init:function(j){h=j;g.onLeave(function(){h=null;});},setChecked:function(j){if(h)h.setValue(j);}};e.exports=i;},null);
__d("AudienceSelectorTags",[],function(a,b,c,d,e,f){var g={},h={hasTags:function(i){return g.hasOwnProperty(i);},setHasTags:function(i){if(i)g[i]=true;}};e.exports=h;},null);
__d("OnVisible",["Arbiter","DOM","Event","Parent","Run","Vector","ViewportBounds","coalesce","copyProperties","queryThenMutateDOM"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=[],r,s=0,t=[],u,v,w,x,y;function z(){q.forEach(function(fa){fa.remove();});if(v){v.remove();u.remove();r.unsubscribe();v=u=r=null;}s=0;q.length=0;}function aa(){if(!q.length){z();return;}t.length=0;w=l.getScrollPosition().y;x=l.getViewportDimensions().y;y=m.getTop();for(var fa=0;fa<q.length;++fa){var ga=q[fa];if(isNaN(ga.elementHeight))t.push(fa);ga.elementHeight=l.getElementDimensions(ga.element).y;ga.elementPos=l.getElementPosition(ga.element);ga.hidden=j.byClass(ga.element,'hidden_elem');if(ga.scrollArea){ga.scrollAreaHeight=l.getElementDimensions(ga.scrollArea).y;ga.scrollAreaY=l.getElementPosition(ga.scrollArea).y;}}s=fa;}function ba(){for(var fa=Math.min(q.length,s)-1;fa>=0;--fa){var ga=q[fa];if(!ga.elementPos||ga.removed){q.splice(fa,1);continue;}if(ga.hidden)continue;var ha=w+x+ga.buffer,ia=false;if(ha>ga.elementPos.y){var ja=w+y-ga.buffer,ka=w+y+x+ga.buffer,la=ga.elementPos.y+ga.elementHeight,ma=!ga.strict||(ja<ga.elementPos.y&&ka>la);ia=ma;if(ia&&ga.scrollArea){var na=ga.scrollAreaY+ga.scrollAreaHeight+ga.buffer;ia=(ga.elementPos.y>ga.scrollAreaY-ga.buffer)&&(ga.elementPos.y<na);}}if(ga.inverse?!ia:ia){ga.remove();ga.handler(t.indexOf(fa)!==-1);}}}function ca(){da();if(q.length)return;v=i.listen(window,'scroll',da);u=i.listen(window,'resize',da);r=g.subscribe('dom-scroll',da);}function da(){p(aa,ba,'OnVisible/positionCheck');}function ea(fa,ga,ha,ia,ja,ka){"use strict";this.element=fa;this.handler=ga;this.strict=ha;this.buffer=n(ia,300);this.inverse=n(ja,false);this.scrollArea=ka||null;if(this.scrollArea)this.scrollAreaListener=this.$OnVisible0();if(q.length===0)k.onLeave(z);ca();q.push(this);}ea.prototype.remove=function(){"use strict";if(this.removed)return;this.removed=true;if(this.scrollAreaListener)this.scrollAreaListener.remove();};ea.prototype.reset=function(){"use strict";this.elementHeight=null;this.removed=false;if(this.scrollArea)this.scrollAreaListener=this.$OnVisible0();q.indexOf(this)===-1&&q.push(this);ca();};ea.prototype.setBuffer=function(fa){"use strict";this.buffer=fa;da();};ea.prototype.checkBuffer=function(){"use strict";da();};ea.prototype.getElement=function(){"use strict";return this.element;};ea.prototype.$OnVisible0=function(){"use strict";return i.listen(h.find(this.scrollArea,'.uiScrollableAreaWrap'),'scroll',this.checkBuffer);};o(ea,{checkBuffer:da});e.exports=ea;},null);
__d("PopoverAsyncMenu",["AsyncRequest","Event","PopoverMenu","copyProperties"],function(a,b,c,d,e,f,g,h,i,j){var k={},l=0;for(var m in i)if(i.hasOwnProperty(m))o[m]=i[m];var n=i===null?null:i.prototype;o.prototype=Object.create(n);o.prototype.constructor=o;o.__superConstructor__=i;function o(p,q,r,s,t){"use strict";this._endpoint=s;this._loadingMenu=r;this._instanceId=l++;k[this._instanceId]=this;this._mouseoverListener=h.listen(q,'mouseover',this.fetchMenu.bind(this));i.call(this,p,q,null,t);}o.prototype._onLayerInit=function(){"use strict";if(!this._menu&&this._loadingMenu)this.setMenu(this._loadingMenu);this.fetchMenu();this._popover.getLayer().subscribe('key',this._handleKeyEvent.bind(this));};o.prototype.fetchMenu=function(){"use strict";if(this._fetched)return;new g().setURI(this._endpoint).setData({pmid:this._instanceId}).send();this._fetched=true;if(this._mouseoverListener){this._mouseoverListener.remove();this._mouseoverListener=null;}};o.setMenu=function(p,q){"use strict";k[p].setMenu(q);};o.getInstance=function(p){"use strict";return k[p];};j(o.prototype,{_fetched:false,_mouseoverListener:null});e.exports=o;},null);
__d("SelectorDeprecated",["Event","Arbiter","Button","ContextualLayer","CSS","DataStore","DOM","Focus","HTML","Keys","MenuDeprecated","Parent","Style","Toggler","Tooltip","URI","Vector","arrayContains","copyProperties","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){var aa,ba,ca=[],da;function ea(pa){return r.byClass(pa,'uiSelector');}function fa(pa){return r.byClass(pa,'uiSelectorButton');}function ga(){if(!ba){ba=new j({position:'below'},m.create('div'));k.addClass(ba.getRoot(),'uiSelectorContextualLayer');}return ba;}function ha(pa){return m.scry(pa,'select')[0];}function ia(pa){return m.find(pa,'div.uiSelectorMenuWrapper');}function ja(){ja=z;q.subscribe('select',function(pa,qa){if(!aa||!qa||qa.menu!==oa.getSelectorMenu(aa))return;var ra=ka(aa),sa=la(qa.item);if(sa){var ta=aa,ua=oa.isOptionSelected(qa.item),va=oa.inform('select',{selector:ta,option:qa.item,clone:da});if(va===false)return;if(ra||!ua){oa.setSelected(ta,oa.getOptionValue(qa.item),!ua);oa.inform('toggle',{selector:ta,option:qa.item});oa.inform('change',{selector:ta});h.inform('Form/change',{node:ta});if(ma(ta))l.set(ta,'dirty',true);}}if(!ra||!sa)aa&&oa.toggle(aa);});}function ka(pa){return !!pa.getAttribute('data-multiple');}function la(pa){return k.hasClass(pa,'uiSelectorOption');}function ma(pa){return !!pa.getAttribute('data-autosubmit');}var na=function(){na=z;var pa={keydown:function(event){var qa=event.getTarget();if(m.isInputNode(qa))return;switch(g.getKeyCode(event)){case p.DOWN:case p.SPACE:case p.UP:if(fa(qa)){var ra=ea(qa);oa.toggle(ra);return false;}break;case p.ESC:if(aa){var sa=oa.getSelectorButton(aa);oa.toggle(aa);sa&&n.set(sa);return false;}break;}},mouseover:function(event){var qa=r.byAttribute(event.getTarget(),'ajaxify');if(qa&&k.hasClass(qa,'uiSelectorButton'))oa.loadMenu(ea(qa));}};g.listen(document.body,pa);};t.subscribe(['show','hide'],function(pa,qa){var ra=ea(qa.getActive());if(ra){na();ja();var sa=oa.getSelectorButton(ra),ta=oa.getSelectorMenu(ra),ua=pa==='show';sa.setAttribute('aria-expanded',ua?'true':'false');if(ua){aa=ra;if(k.hasClass(sa,'uiButtonDisabled')){oa.setEnabled(ra,false);return false;}ta=ta||oa.loadMenu(ra);var va=s.getScrollParent(ra),wa=va!==window&&va!==m.getDocumentScrollElement();if(wa||k.hasClass(ra,'uiSelectorUseLayer')){if(wa)ca.push(g.listen(va,'scroll',function(){qa.hide();}));da=m.create('div',{className:ra.className});k.addClass(da,'invisible_elem');w.getElementDimensions(ra).setElementDimensions(da);m.replace(ra,da);var xa=k.hasClass(ra,'uiSelectorRight'),ya=k.hasClass(ra,'uiSelectorBottomUp');ga().setContext(da).setContent(ra).setPosition(ya?'above':'below').setAlignment(xa?'right':'left').show();}q.register(ta);var za=q.getCheckedItems(ta);if(!za.length)za=q.getEnabledItems(ta);if(za.length)q.focusItem(za[0]);}else{aa=null;if(da){while(ca.length)ca.pop().remove();m.replace(da,ra);ga().hide();da=null;}ta&&q.unregister(ta);if(ma(ra)&&l.get(ra,'dirty')){var ab=m.scry(ra,'input.submitButton')[0];ab&&ab.click();l.remove(ra,'dirty');}}k.conditionClass(oa.getSelectorButton(ra),'selected',ua);oa.inform(ua?'open':'close',{selector:ra,clone:da});}});var oa=y(new h(),{attachMenu:function(pa,qa,ra){pa=ea(pa);if(pa){aa&&q.unregister(oa.getSelectorMenu(aa));m.setContent(ia(pa),qa);aa&&q.register(oa.getSelectorMenu(pa));da&&ga().updatePosition();if(ra){var sa=pa.getAttribute('data-name');sa&&ra.setAttribute('name',sa);if(!ka(pa))ra.setAttribute('multiple',false);var ta=ha(pa);if(ta){m.replace(ta,ra);}else m.insertAfter(pa.firstChild,ra);}return true;}},getOption:function(pa,qa){var ra=oa.getOptions(pa),sa=ra.length;while(sa--)if(qa===oa.getOptionValue(ra[sa]))return ra[sa];return null;},getOptions:function(pa){var qa=q.getItems(oa.getSelectorMenu(pa));return qa.filter(la);},getEnabledOptions:function(pa){var qa=q.getEnabledItems(oa.getSelectorMenu(pa));return qa.filter(la);},getSelectedOptions:function(pa){return q.getCheckedItems(oa.getSelectorMenu(pa));},getOptionText:function(pa){return q.getItemLabel(pa);},getOptionValue:function(pa){var qa=ea(pa),ra=ha(qa),sa=oa.getOptions(qa).indexOf(pa);return sa>=0?ra.options[sa+1].value:'';},getSelectorButton:function(pa){return m.find(pa,'a.uiSelectorButton');},getSelectorMenu:function(pa){return m.scry(pa,'div.uiSelectorMenu')[0];},getValue:function(pa){var qa=ha(pa);if(!qa)return null;if(!ka(pa))return qa.value;var ra=[],sa=qa.options;for(var ta=1,ua=sa.length;ta<ua;ta++)if(sa[ta].selected)ra.push(sa[ta].value);return ra;},isOptionSelected:function(pa){return q.isItemChecked(pa);},listen:function(pa,qa,ra){return this.subscribe(qa,function(sa,ta){if(ta.selector===pa)return ra(ta,sa);});},loadMenu:function(pa,qa){var ra=oa.getSelectorMenu(pa);if(!ra){var sa=oa.getSelectorButton(pa),ta=sa.getAttribute('ajaxify');if(ta){d(['AsyncRequest'],function(va){var wa=v(ta),xa=wa.getQueryData();wa.setQueryData({});var ya=new va(wa).setData(xa).setNectarModuleDataSafe(sa).setRelativeTo(sa);qa&&ya.setFinallyHandler(function(){setTimeout(qa,0);});ya.send();}.bind(this));var ua=o('<div class="uiSelectorMenuWrapper uiToggleFlyout">'+'<div class="uiMenu uiSelectorMenu loading">'+'<ul class="uiMenuInner">'+'<li><span></span></li>'+'</ul>'+'</div>'+'</div>');m.appendContent(sa.parentNode,ua);ra=oa.getSelectorMenu(pa);sa.removeAttribute('onmouseover');}}else qa&&qa();return ra;},setButtonLabel:function(pa,qa){var ra=oa.getSelectorButton(pa),sa=parseInt(ra.getAttribute('data-length'),10);qa=qa||ra.getAttribute('data-label')||'';i.setLabel(ra,qa);if(typeof qa==='string')if(sa&&qa.length>sa){ra.setAttribute('title',qa);}else ra.removeAttribute('title');},setButtonTooltip:function(pa,qa){var ra=oa.getSelectorButton(pa),sa=r.byTag(ra,'a');sa&&u.set(sa,qa||ra.getAttribute('data-tooltip')||'');},setEnabled:function(pa,qa){if(!qa&&aa&&ea(pa)===aa)oa.toggle(pa);i.setEnabled(oa.getSelectorButton(pa),qa);},setOptionEnabled:function(pa,qa){q.setItemEnabled(pa,qa);},setSelected:function(pa,qa,ra){ra=ra!==false;var sa=oa.getOption(pa,qa);if(!sa)return;var ta=oa.isOptionSelected(sa);if(ra!==ta){if(!ka(pa)&&!ta){var ua=oa.getSelectedOptions(pa)[0];ua&&q.toggleItem(ua);}q.toggleItem(sa);}oa.updateSelector(pa);},toggle:function(pa){t.toggle(m.scry(ea(pa),'div.wrap')[0]);},updateSelector:function(pa){var qa=oa.getOptions(pa),ra=oa.getSelectedOptions(pa),sa=ha(pa).options,ta=[],ua=[];for(var va=0,wa=qa.length;va<wa;va++){var xa=x(ra,qa[va]);sa[va+1].selected=xa;if(xa){var ya=oa.getOptionText(qa[va]);ta.push(ya);ua.push(qa[va].getAttribute('data-tooltip')||ya);}}sa[0].selected=!ra.length;var za=k.hasClass(pa,'uiSelectorDynamicLabel'),ab=k.hasClass(pa,'uiSelectorDynamicTooltip');if(za||ab){var bb='';if(ka(pa)){var cb=oa.getSelectorButton(pa);bb=cb.getAttribute('data-delimiter')||', ';}ta=ta.join(bb);ua=ua.join(bb);za&&oa.setButtonLabel(pa,ta);ab&&oa.setButtonTooltip(pa,ua);}}});e.exports=oa;},null);
__d("PopoverLoadingMenu",["BehaviorsMixin","DOM","PopoverMenuInterface","copyProperties","cx","joinClasses"],function(a,b,c,d,e,f,g,h,i,j,k,l){for(var m in i)if(i.hasOwnProperty(m))o[m]=i[m];var n=i===null?null:i.prototype;o.prototype=Object.create(n);o.prototype.constructor=o;o.__superConstructor__=i;function o(p){"use strict";i.call(this);this._config=p||{};this._theme=p.theme||{};}o.prototype.getRoot=function(){"use strict";if(!this._root){this._root=h.create('div',{className:l("_54nq",this._config.className,this._theme.className)},h.create('div',{className:"_54ng"},h.create('div',{className:"_54nf _54af"},h.create('span',{className:"_54ag"}))));if(this._config.behaviors)this.enableBehaviors(this._config.behaviors);}return this._root;};j(o.prototype,g,{_root:null});e.exports=o;},null);
__d("ButtonGroupX",["ArbiterMixin","mixin"],function(a,b,c,d,e,f,g,h){var i=h(g);for(var j in i)if(i.hasOwnProperty(j))l[j]=i[j];var k=i===null?null:i.prototype;l.prototype=Object.create(k);l.prototype.constructor=l;l.__superConstructor__=i;function l(m,n){"use strict";n=n||{};this._root=m;this._radioButtons=n.radioButtons||[];this._selected=n.selected;this.initButtonListeners();}l.prototype.initButtonListeners=function(){"use strict";var m=this._radioButtons.length;while(m--){var n=this._radioButtons[m];n.subscribe('select',this.selectButton.bind(this,n));}};l.prototype.getSelected=function(){"use strict";return this._selected;};l.prototype.getSelectedValue=function(){"use strict";return this._selected?this._selected.getValue():null;};l.prototype.selectButton=function(m){"use strict";if(this._selected!==m){this.setSelected(m);this.inform('change',{selected:m});}return this;};l.prototype.setSelected=function(m){"use strict";if(this._selected!==m){if(this._selected)this._selected.setSelected(false);m.setSelected(true);this._selected=m;}return this;};l.prototype.setSelectedValue=function(m){"use strict";var n=this._radioButtons.length;while(n--){var o=this._radioButtons[n];if(o.getValue()===m)return this.setSelected(o);}return this;};e.exports=l;},null);
__d("XPrivacyCustomDialogControllerURIBuilder",["XControllerURIBuilder"],function(a,b,c,d,e,f){e.exports=b("XControllerURIBuilder").create("\/privacy\/custom_dialog\/",{id:{type:"String",required:true},option_id:{type:"String",required:true},autosave:{type:"Bool"},explain_tags:{type:"Bool"},limit_community:{type:"Bool"},limit_facebook:{type:"Bool"},limit_fof:{type:"Bool"},limit_tagexpand:{type:"Bool"},is_new_privacy_selector:{type:"Bool"},render_location:{type:"Int"},content_type:{type:"String"},post_param:{type:"String"},privacy_data:{type:"String"},source:{type:"String"},tags:{type:"IntVector"},tag_expansion_button:{type:"String"},__asyncDialog:{type:"Int"}});},null);