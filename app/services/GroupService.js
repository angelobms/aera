'use strict';

import Vue from 'vue';

export default class MyService {
    constructor(){
        this.resourceAll = Vue.resource('/api/groups');
        this.resourceOne = Vue.resource('/api/groups{/id}');
    }
    
    getAll() {
        return this.resourceAll.get().then((d) => d.json());
    }

    get(id) {
        return this.resourceOne.get({id}).then(d => d.json());
    }

    createGroup(group){
        return this.resourceAll.save(group).then((g) => g.json());
    }

    deleteGroup(group){
        return this.resourceOne.delete({id:group.id}).then((g)=>g.json());
    }

    addStudent({group, student_id}) {
        return Vue.http.post(`/api/groups/${group.id}/addStudent`,{student_id});
    }
}