

var storage={

    get:function(key){
        return JSON.parse(localStorage.getItem(key));

    },
    set:function(key,value){

        localStorage.setItem(key,JSON.stringify(value));

    },
    remove:function(key){
        localStorage.removeItem(key);

    }
}

export default storage;