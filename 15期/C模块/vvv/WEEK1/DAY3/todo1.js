let vm = new Vue({
    el: '#app',
    data: {
        todos:[{isSelected:false,title:"睡觉"},{isSelected:false,title:"吃饭"}],
        title:'',
        hash:'/all',
        flag:'true'
    },
    created:function () {
        window.addEventListener('hashchange',()=> {
            this.hash=window.location.hash.substr(1);
        });
        window.location.hash='#/all';
    },
    methods:{
        add(){
            this.todos.push({isSelected:false,title:this.title});
            this.title='';
        },
        remove(a){
            this.todos=this.todos.filter(item =>item!==a)
        }
    },
    computed:{
        show(){
            if(this.hash==='/all')return this.todos;
            if(this.hash==='/finish')return this.todos.filter(item =>item.isSelected);
            if(this.hash==='/unfinish')return this.todos.filter(item =>!item.isSelected);
        },
        num(){
            return this.todos.filter(item =>!item.isSelected).length;
        }
    }
});