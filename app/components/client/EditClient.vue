<template>
    <div>
        <ClientForm v-if="client" :client="client" v-on:formSubmit="updateClient" v-on:formCancel="cancel"></ClientForm>
        <span v-if="!client"> Carregando... </span>
        <MyErrMsg :errorMessage="errorMessage"></MyErrMsg>
        <div class="row">
            <div>
                <GetPaymentStudent :id="clientID"></GetPaymentStudent>
            </div>
        </div>
    </div>
</template>

<script>
import ClientService from '../../services/ClientService'
import ClientForm from './ClientForm.vue'
import GetPaymentStudent from '../payment/GetPaymentStudent.vue'
const cliSrv = new ClientService();
export default {
    components: {ClientForm,GetPaymentStudent},
    data: function(){
        return {
            client: null,
            errorMessage: ''
        }
    },
    mounted() {
        cliSrv.getClient(this.$route.params.id).then(c => {
            this.client = c;
            this.$store.dispatch('setClient', c);
        });
    },
    computed : {
        clientID() {
            return this.$route.params.id
        }
    },
    methods: {
        updateClient(e) {
            this.$store.dispatch('updateClient', this.client)
                .then(() => this.$router.push('/clients'))
                .catch((err) => this.errorMessage = err.body.message);
        },
        cancel() {
            this.$router.go(-1);
        }
    }
}
</script>
