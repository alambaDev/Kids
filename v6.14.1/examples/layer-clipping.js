"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3094],{92534:function(e,r,t){var n=t(41376),a=t(79847),o=t(42010),s=t(54354),i=new o.Z({source:new a.Z});new n.Z({layers:[i],target:"map",view:new s.ZP({center:[0,0],zoom:2})});i.on("prerender",(function(e){var r=e.context,t=e.inversePixelTransform,n=Math.sqrt(t[0]*t[0]+t[1]*t[1]),a=-Math.atan2(t[1],t[0]);r.save(),r.translate(r.canvas.width/2,r.canvas.height/2),r.rotate(-a),r.scale(3*n,3*n),r.translate(-75,-80),r.beginPath(),r.moveTo(75,40),r.bezierCurveTo(75,37,70,25,50,25),r.bezierCurveTo(20,25,20,62.5,20,62.5),r.bezierCurveTo(20,80,40,102,75,120),r.bezierCurveTo(110,102,130,80,130,62.5),r.bezierCurveTo(130,62.5,130,25,100,25),r.bezierCurveTo(85,25,75,37,75,40),r.clip(),r.translate(75,80),r.scale(1/3/n,1/3/n),r.rotate(a),r.translate(-r.canvas.width/2,-r.canvas.height/2)})),i.on("postrender",(function(e){e.context.restore()}))}},function(e){var r=function(r){return e(e.s=r)};r(9877),r(92534)}]);
//# sourceMappingURL=layer-clipping.js.map