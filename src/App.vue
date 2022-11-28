<template>
    <div class="view login" v-if="state.stateUsername === '' || state.stateUsername === 'null'">
      <!--// v-if is like if statement in vanilla -->
      <form class="login-form" @submit.prevent="Login">
        <!--// .prevent is a directive modifier like e.preventDefaults() -->
        <div class="form-inner">
          <h1>Login to VueFireChat</h1>
            <label for="username">Your Username</label>
            <input 
            type="text"
            v-model="inputUsername"
            
            placeholder="Please enter your username..." 
            />
            <!-- v-model binds directly to ref -->
            <input type="submit" value="Login"/>
        </div>
      </form>
    </div>

    <div class="view chat" v-else>
      <header>
        <button class="logout" @click="Logout">Logout</button>
        <h1>Welcome {{state.stateUsername}}</h1>
      </header>
      <section class="chat-box">
        <div 
        v-for="message in state.localMessages" 
        :key="message.key"
        :class="(message.username == state.stateUsername ? 'message current-user' : 'message')"
        >
        <div class="message-inner">
          <div class="username">{{message.username}}</div>
          <div class="content">{{message.content}}</div>

        </div>
        </div>
      </section>
      <footer>
        <form @submit.prevent="SendMessage">
          <input type="text"
          v-model="inputMessage"
           placeholder="write a message..."/>
          <input 
          type="submit" 
          value="send"/>
        </form>
      </footer>
    </div>

</template>

<script>
import {reactive, onMounted, ref} from 'vue';
import db from './db'

export default {
  setup(){
    const inputUsername = ref("");
    const inputMessage = ref("");


    const state = reactive({
      stateUsername: "",
      localMessages: []
    })

    const Login = () =>{
      if(inputUsername.value != null || inputUsername.value != ""){
        state.stateUsername = inputUsername.value;
        inputUsername.value = "";
      }
    }
    
    const SendMessage = () =>{
      const messagesReference = db.database().ref("messages");

      if(inputMessage.value === null || inputMessage.value === ""){
          return
      }

      const message = {
        username: state.stateUsername,
        content: inputMessage.value
      }

      messagesReference.push(message);
      inputMessage.value = "";
      
    }

    onMounted(() => {
      const messagesReference = db.database().ref("messages");

      messagesReference.on('value', snapshot =>{
        const data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach(key =>{
          messages.push({
            id:key,
            username: data[key].username,
            content: data[key].content,
          })
        })
        state.localMessages = messages;
      })
    })

    const Logout = () =>{
     state.stateUsername= "";
    }
    return {
      inputUsername,
      Login,
      state,
      Logout,
      inputMessage,
      SendMessage
    }
  }
}
</script>

