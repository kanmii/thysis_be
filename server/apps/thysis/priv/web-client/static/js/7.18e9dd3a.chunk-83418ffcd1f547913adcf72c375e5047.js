(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{609:function(e,t,a){},646:function(e,t,a){"use strict";a.r(t);var n=a(24),r=a(16),c=a(55),o=a(57),u=a(64),l=a(56),s=a(65),i=a(0),m=a(653),d=a(630),v=a(639),p=a(657),g=(a(609),a(375)),E=a(11),b=a(391),f=a(378),O=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(r)))).renderMainOrLoading=function(){var e=a.props,t=e.loading,n=e.quote,r=e.error;return r?i.createElement("div",{className:"{`${classes.sourceMain} ${classes.errorContainer}`}"},r.message):t||!n?i.createElement(m.a,{inverted:!0,className:"{`${classes.sourceMain}`}",active:!0},i.createElement(d.a,{size:"medium"},"Loading..")):i.createElement("div",{className:"main"},i.createElement("div",{className:"quote-text"},n.text),i.createElement("hr",null),i.createElement("div",{className:"date"},"Date: ",n.date),i.createElement("div",{className:"page-start"},"Page start: ",n.pageStart," "),i.createElement("div",{className:"page-end"},"Page End: ",n.pageEnd," "),i.createElement("div",{className:"volume"},"Volume: ",n.volume," "),i.createElement("div",{className:"extras"},"Extras: ",n.extras," "),i.createElement("hr",null),n.source&&i.createElement(p.a,{to:Object(E.m)(n.source.id),className:"quote-text"},Object(b.b)(n.source)),n.tags&&i.createElement("div",null,i.createElement("h4",null,"Tags"),i.createElement(v.a,{divided:!0},n.tags.map(a.renderTag))))},a.renderTag=function(e){if(e){var t=e.id,a=e.text;return i.createElement(v.a.Item,{as:p.a,to:Object(E.n)(t),key:t,className:"quote-text"},i.createElement("div",null,a))}},a}return Object(s.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){Object(E.o)("Quote")}},{key:"componentWillUnmount",value:function(){Object(E.o)()}},{key:"render",value:function(){return i.createElement(f.a,null,i.createElement("div",{className:"quote-route"},i.createElement(g.a,{title:"Quote",showSideBarTrigger:!0}),this.renderMainOrLoading()))}}]),t}(i.Component),j=a(4),h=a(5),q=a.n(h),N=a(321);function x(){var e=Object(j.a)(["\n  fragment QuoteFullFrag on Quote {\n    id\n    text\n    date\n    extras\n    issue\n    pageStart\n    pageEnd\n    volume\n    source {\n      ...SourceForDisplayFrag\n    }\n    tags {\n      id\n      text\n    }\n  }\n\n  ","\n"]);return x=function(){return e},e}var w=q()(x(),N.a);function y(){var e=Object(j.a)(["\n  query QuoteFull($quote: GetQuoteInput!) {\n    quote(quote: $quote) {\n      ...QuoteFullFrag\n    }\n  }\n\n  ","\n"]);return y=function(){return e},e}var F=q()(y(),w),Q=Object(r.graphql)(F,{props:function(e){var t=e.data;return Object(n.a)({},t)},options:function(e){return{variables:{quote:{id:e.match.params.id}}}}});t.default=Object(r.compose)(r.withApollo,Q)(O)}}]);
//# sourceMappingURL=./7.18e9dd3a.chunk.js-32cacd666fa44bf1a40d1a2abf0c1dd2.map