"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4425],{94420:function(e,t,n){var o=n(91118),r=n(41376),a=n(54354),i=n(69039),c=n(77975),s=n(720),l=n(77138),u=n(95783),d=n(79847),w=n(41372),g=n(42010),m=new u.Z({url:"data/geojson/switzerland.geojson",format:new o.Z}),f=new i.ZP({fill:new c.Z({color:"rgba(255, 255, 255, 0.6)"}),stroke:new s.Z({color:"#319FD3",width:1}),image:new l.Z({radius:5,fill:new c.Z({color:"rgba(255, 255, 255, 0.6)"}),stroke:new s.Z({color:"#319FD3",width:1})})}),Z=new w.Z({source:m,style:f}),k=new a.ZP({center:[0,0],zoom:1}),v=new r.Z({layers:[new g.Z({source:new d.Z}),Z],target:"map",view:k});document.getElementById("zoomtoswitzerland").addEventListener("click",(function(){var e=m.getFeatures()[0].getGeometry();k.fit(e,{padding:[170,50,30,150]})}),!1),document.getElementById("zoomtolausanne").addEventListener("click",(function(){var e=m.getFeatures()[1].getGeometry();k.fit(e,{padding:[170,50,30,150],minResolution:50})}),!1),document.getElementById("centerlausanne").addEventListener("click",(function(){var e=m.getFeatures()[1].getGeometry(),t=v.getSize();k.centerOn(e.getCoordinates(),t,[570,500])}),!1)}},function(e){var t=function(t){return e(e.s=t)};t(9877),t(94420)}]);
//# sourceMappingURL=center.js.map