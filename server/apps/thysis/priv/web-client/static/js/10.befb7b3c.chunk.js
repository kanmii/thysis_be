(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{615:function(e,t,r){},643:function(e,t,r){"use strict";r.r(t);var a=r(16),n=r(45),c=r.n(n),o=r(326),u=r(4),l=r(5),s=r.n(l),i=r(305);function m(){var e=Object(u.a)(["\n  mutation CreateProjectMutation($project: CreateProjectInput!) {\n    project(project: $project) {\n      ...ProjectFragment\n    }\n  }\n\n  ","\n"]);return m=function(){return e},e}var p=s()(m(),i.a),j=r(8),d=r.n(j),f=r(14),v=r(55),b=r(57),h=r(64),P=r(56),E=r(65),w=r(0),g=r.n(w),y=r(632),k=r(351),O=r(636),C=r(639),N=(r(615),r(375)),x=r(62),F={form:{title:""}},S=r(11),$=r(634),I=r(378),M=function(e){function t(){var e,r;Object(v.a)(this,t);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(r=Object(h.a)(this,(e=Object(P.a)(t)).call.apply(e,[this].concat(n)))).state=F,r.renderForm=function(){var e=r.props,t=e.loading,a=e.error;if(!t&&!a){var n=r.state.form,c=r.formError();return g.a.createElement(O.a,{className:"form"},g.a.createElement("div",{className:"control"},g.a.createElement(O.a.Field,{control:y.a,className:"input",name:"title",autoComplete:"off",placeholder:"Project title",autoFocus:!0,onChange:r.onProjectInputChange,value:r.state.form.title,error:c}),n.title&&!c?g.a.createElement(k.a,{name:"checkmark",color:"green",onClick:r.submit}):void 0,n.title?g.a.createElement(k.a,{name:"times",color:"red",onClick:r.resetForm}):void 0),c&&g.a.createElement("div",{className:"message"},"Too short"))}},r.renderProjects=function(){var e=r.props,t=e.projects,a=e.loading,n=e.error;return a?g.a.createElement(x.a,null):n?g.a.createElement("div",null,"Unable to load projects",g.a.createElement("div",null,n.message)):t&&t.length?g.a.createElement("div",null,g.a.createElement("div",{className:"your-projects"},g.a.createElement("span",{className:"label"},"Projects")),g.a.createElement(C.a,{divided:!0,relaxed:!0},t.map(r.renderProject))):g.a.createElement("div",{className:"no-project"},"You currently have no project. You may create one now.")},r.renderProject=function(e){if(e)return g.a.createElement(C.a.Item,{key:e.id},g.a.createElement(C.a.Content,{className:"project-row",onClick:r.projectSelected(e)},g.a.createElement(C.a.Header,{className:"project-row__header"},e.title),g.a.createElement(C.a.Description,{className:"project-row__desc"},"Created: \xa0 \xa0"," ",Object($.a)(e.insertedAt,"eeee, M/MMM/yyyy HH:mm a"))))},r.projectSelected=function(e){return Object(f.a)(d.a.mark(function t(){var a,n,c;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=r.props,n=a.history,c=a.updateLocalProject,t.next=3,c({variables:{currentProject:e}});case 3:n.push(Object(S.k)());case 4:case"end":return t.stop()}},t,this)}))},r.submit=Object(f.a)(d.a.mark(function e(){var t,a,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.props.createProject(r.state.form.title);case 2:if(t=e.sent){e.next=5;break}return e.abrupt("return");case 5:if(a=t.data){e.next=8;break}return e.abrupt("return");case 8:if(n=a.project){e.next=11;break}return e.abrupt("return");case 11:r.projectSelected(n)();case 12:case"end":return e.stop()}},e,this)})),r.onProjectInputChange=function(e,t){var a=t.value;r.setState(function(e){return c()(e,{form:{title:{$set:a}}})})},r.resetForm=function(){return r.setState(function(e){return c()(e,{form:{title:{$set:""}}})})},r.formError=function(){var e=r.state.form.title;return e.length>0&&e.length<2},r}return Object(E.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return g.a.createElement(I.a,null,g.a.createElement("div",{className:"select-project"},g.a.createElement(N.a,{title:"Select Project",showSideBarTrigger:!0}),g.a.createElement("div",{className:"main"},this.renderForm(),this.renderProjects())))}}]),t}(g.a.Component);function q(){var e=Object(u.a)(["\n  mutation ProjectLocalMutation($currentProject: LocalProjectInput!) {\n    currentProject(currentProject: $currentProject) @client\n  }\n"]);return q=function(){return e},e}var L=s()(q()),_=Object(a.graphql)(L,{props:function(e){return{updateLocalProject:e.mutate}}}),H=Object(a.graphql)(o.a,{props:function(e){return e.data}}),A=Object(a.graphql)(p,{props:function(e){var t=e.mutate;return{createProject:function(r){return t({variables:{project:{title:r,userId:e.ownProps.user.id}},update:function(t,r){var a=r.data;if(a){var n=a.project;if(n){e.ownProps.updateLocalProject({variables:{currentProject:n}});var u=t.readQuery({query:o.a}),l=c()(u,{projects:{$push:[n]}});t.writeQuery({query:o.a,data:l})}}}})}}}});t.default=Object(a.compose)(H,_,A)(M)}}]);
//# sourceMappingURL=10.befb7b3c.chunk.js.map