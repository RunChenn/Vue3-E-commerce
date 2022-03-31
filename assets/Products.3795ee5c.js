import{r as g,o as u,b as m,w as t,G as x,H as j,e as _,B as P,d as c,C as S,O as l,J as k,K as w,v,y as L,z as M,V as U,D as B}from"./vendor.1eeb228f.js";import{a as C}from"./index.06ff196c.js";import{B as $}from"./Breadcrumb.cf5e7018.js";import{_ as y}from"./index.fa9b4643.js";import{P as D}from"./Pagination.0d147726.js";import{C as O,F as q}from"./Form.64db5a3e.js";import{C as N}from"./Carousel.2f44bce3.js";const V={props:{products:{type:Array,default:()=>[]},loadingStatus:{type:Object,default:()=>({loadingItem:{type:String,default:""}})}},setup(s,{emit:a}){return{openModal:e=>{a("getProduct",e)}}}},A=s=>(k("data-v-0c5b5b3c"),s=s(),w(),s),F={class:"row"},E={class:"card border-0 mb-4 position-relative"},G=["src"],z={class:"card-body p-0"},H={class:"mb-0 mt-3"},J={class:"card-text mb-0"},K={class:"text-muted"},Q=A(()=>t("p",{class:"text-muted mt-3"},null,-1));function R(s,a,o,e,h,b){const d=g("router-link");return u(),m(x,null,[t("div",F,[(u(!0),m(x,null,j(o.products,i=>(u(),m("div",{class:"col-md-4",key:i.id},[t("div",E,[_(d,{to:{name:"ProductDetail",params:{id:i.id}},class:"pic"},{default:P(()=>[t("img",{src:i.imageUrl,class:"card-img-top rounded-0 img-fluid",alt:"..."},null,8,G)]),_:2},1032,["to"]),c(` <a href="#" class="text-dark">
          <i class="fas fa-heart position-absolute" style="right: 16px; top: 16px"></i>
        </a> `),t("div",z,[t("h5",H,[_(d,{to:{name:"ProductDetail",params:{id:i.id}}},{default:P(()=>[S(l(i.title),1)]),_:2},1032,["to"]),c(' <a href="./detail.html">{{ item.title }}</a> ')]),t("p",J,[S(" NT$"+l(i.price)+" ",1),t("span",K,[t("del",null,"NT$"+l(i.origin_price),1)])]),Q])])]))),128))]),c(` <div class="prodsTable">
    <div class="row">
      <div class="col-12 col-sm-12">
        <h5>\u7522\u54C1\u5217\u8868</h5>
        <hr />
        <table class="table table-hover">
          <thead>
            <tr>
              <th>\u5716\u7247</th>
              <th scope="col" class="text-start">\u7522\u54C1\u540D\u7A31</th>
              <th scope="col">\u50F9\u683C</th>
              <th scope="col">\u64CD\u4F5C</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td style="width: 200px">
                <div
                  style="
                    height: 100px;
                    background-size: cover;
                    background-position: center;
                  "
                  :style="{ backgroundImage: \`url(\${item.imageUrl})\` }"
                ></div>
              </td>
              <td class="text-start">{{ item.title }}</td>
              <td>
                <div class="h5" v-if="!item.price">
                  {{ item.origin_price }} \u5143
                </div>
                <del class="h6" v-if="item.price"
                  >\u539F\u50F9 {{ item.origin_price }} \u5143</del
                >
                <div class="h5" v-if="item.price">
                  \u73FE\u5728\u53EA\u8981 {{ item.price }} \u5143
                </div>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm me-2 mb-md-1"
                  data-bs-target="#productModal"
                  data-bs-toggle="modal"
                  @click="openModal(item.id)"
                  :disabled="loadingStatus.loadingItem === item.id"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    v-if="loadingStatus.loadingItem === item.id"
                  ></span>
                  \u67E5\u770B\u66F4\u591A
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm me-2 mb-md-1"
                  @click="$emit('add-to-cart', item.id)"
                  :disabled="loadingStatus.loadingItem === item.id"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    v-if="loadingStatus.loadingItem === item.id"
                  ></span>
                  \u52A0\u5230\u8CFC\u7269\u8ECA
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div> `)],2112)}var W=y(V,[["render",R],["__scopeId","data-v-0c5b5b3c"]]);const X={props:{isNew:{type:Boolean,default:!1},product:{type:Object,default:()=>({imagesUrl:{type:Array,default:()=>[]},id:{type:String,default:""}})},loadingStatus:{type:Object,default:()=>({loadingItem:{type:String,default:""}})}},setup(s,{emit:a}){return{qty:v(1)}}},Y=s=>(k("data-v-e16bbad4"),s=s(),w(),s),Z={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},tt={class:"modal-dialog modal-xl",role:"document"},et={class:"modal-content border-0"},at={class:"modal-header bg-dark text-white"},ot={class:"modal-title",id:"exampleModalLabel"},st=Y(()=>t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1)),nt={class:"modal-body"},dt={class:"row"},it={class:"col-sm-6"},rt=["src"],ct={class:"col-sm-6"},lt={class:"badge bg-primary rounded-pill"},pt={key:0,class:"h5"},ut={key:1,class:"h6"},mt={key:2,class:"h5"},_t={class:"input-group"};function bt(s,a,o,e,h,b){return u(),m("div",Z,[t("div",tt,[t("div",et,[t("div",at,[t("h5",ot,[t("span",null,l(o.product.title),1)]),st]),t("div",nt,[t("div",dt,[t("div",it,[t("img",{class:"img-fluid",src:o.product.imageUrl,alt:""},null,8,rt)]),t("div",ct,[t("span",lt,l(o.product.category),1),t("p",null,"\u5546\u54C1\u63CF\u8FF0\uFF1A"+l(o.product.description),1),t("p",null,"\u5546\u54C1\u5167\u5BB9\uFF1A"+l(o.product.content),1),o.product.price?c("v-if",!0):(u(),m("div",pt,l(o.product.origin_price)+" \u5143 ",1)),o.product.price?(u(),m("del",ut,"\u539F\u50F9 "+l(o.product.origin_price)+" \u5143",1)):c("v-if",!0),o.product.price?(u(),m("div",mt," \u73FE\u5728\u53EA\u8981 "+l(o.product.price)+" \u5143 ",1)):c("v-if",!0),t("div",null,[t("div",_t,[L(t("input",{type:"number",class:"form-control","onUpdate:modelValue":a[0]||(a[0]=d=>e.qty=d),min:"1"},null,512),[[M,e.qty,void 0,{number:!0}]]),t("button",{type:"button",class:"btn btn-primary",onClick:a[1]||(a[1]=d=>s.$emit("add-to-cart",o.product.id,e.qty))}," \u52A0\u5165\u8CFC\u7269\u8ECA ")])])]),c(" col-sm-6 end ")])])])])],512)}var gt=y(X,[["render",bt],["__scopeId","data-v-e16bbad4"]]);const vt={components:{Carousel:N,Breadcrumb:$,ProdModal:gt,ProdsTable:W,Pagination:D,Carts:O,Form:q},name:"Products",setup(){const s=v(!1),a=v({}),o=v([]),e=v([]),h=v({}),b=U({loadingItem:""});B(async()=>{s.value=!0,d()});const d=async(p=1)=>{try{const r=await C.products.getProducts(p),n=r.products;a.value=r.pagination;let I=n.map(T=>T.category);e.value=[...new Set(I)],o.value=n,s.value=!1}catch(r){s.value=!1,alert(r.message)}};return{isLoading:s,products:o,pagination:a,categorys:e,cart:h,loadingStatus:b,getProducts:d,addToCart:async p=>{try{b.loadingItem=p;const r={product_id:p,qty:qty.value},n=await C.cart.addCart({data:r});alert(n.message),b.loadingItem=""}catch(r){alert(r.message)}},toDetail:async p=>{router.push({path:`/apps-list/members/detail/${p._id}`})}}}},ht={class:"container pt-4 mb-5"},yt={class:"row mt-3"},ft={class:"col-md-12"},xt={class:"col-md-12"};function Pt(s,a,o,e,h,b){const d=g("Loading"),i=g("Carousel"),f=g("Breadcrumb"),p=g("ProdsTable"),r=g("Pagination");return u(),m("div",ht,[c(" Loading "),_(d,{active:e.isLoading,"onUpdate:active":a[0]||(a[0]=n=>e.isLoading=n),"is-full-page":!0},null,8,["active"]),_(i),t("div",yt,[c(` <div class="col-md-3">
        <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
          <div class="card border-0" v-for="category in categorys" :key="category">
            <div class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0">{{ category }}</h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <a href="#" class="py-2 d-block text-muted">Lorem ipsum</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> `),t("div",ft,[_(f)]),t("div",xt,[c(" \u7522\u54C1\u5217\u8868 "),_(p,{products:e.products,"onUpdate:products":a[1]||(a[1]=n=>e.products=n),loadingStatus:e.loadingStatus,"onUpdate:loadingStatus":a[2]||(a[2]=n=>e.loadingStatus=n),onGetProduct:e.getProducts,onAddToCart:e.addToCart},null,8,["products","loadingStatus","onGetProduct","onAddToCart"]),_(r,{pages:e.pagination,"onUpdate:pages":a[3]||(a[3]=n=>e.pagination=n),onUpdatePages:e.getProducts},null,8,["pages","onUpdatePages"])])])])}var Lt=y(vt,[["render",Pt],["__scopeId","data-v-7b19cff0"]]);export{Lt as default};
