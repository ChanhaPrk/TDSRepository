(this.webpackJsonpmovie_app_2019=this.webpackJsonpmovie_app_2019||[]).push([[0],{19:function(e,t,a){e.exports=a(42)},42:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(16),s=a.n(i),o=a(2),c=a.n(o),m=a(17),l=a(3),u=a(4),v=a(6),p=a(5),d=a(18),y=a.n(d);var _=function(e){e.id;var t=e.year,a=e.title,n=e.summary,i=e.poster;return r.a.createElement("div",{class:"movie"},r.a.createElement("img",{src:i,alt:a,title:a}),r.a.createElement("div",{class:"movie__data"},r.a.createElement("h3",{class:"movie__title"},a),r.a.createElement("h5",{class:"movie__year"},t),r.a.createElement("p",{class:"movie__summary"},n)))};var h=function(e){Object(v.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={isLoading:!0,movies:[]},e.getMovies=Object(m.a)(c.a.mark((function t(){var a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.a.get("https://yts-proxy.now.sh/list_movies.json");case 2:a=t.sent,n=a.data.data.movies,e.setState({movies:n,isLoading:!1});case 5:case"end":return t.stop()}}),t)}))),e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.getMovies()}},{key:"render",value:function(){var e=this.state,t=(e.isLoading,e.movies);return r.a.createElement("div",null,this.state.isLoading?"Loading":t.map((function(e){return console.log(e),r.a.createElement(_,{key:e.id,id:e.id,year:e.year,title:e.title,summary:e.summary,poster:e.medium_cover_image})})))}}]),a}(r.a.Component);r.a.Component;var g=h;s.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.0296b26d.chunk.js.map