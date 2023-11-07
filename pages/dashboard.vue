<script setup>
const conversationData = ref([]);
const messageData = ref([]);
const errorState = ref(false);
const loadingState = ref(false);
const errorMessage = ref('');
const displayCreateConvoModal = ref(false);
const dynamicAnimationClass = ref('animate-fade-in-down');
const newConvoName = ref('');
const selectedConversation = ref('');
const msgLoadingState = ref(false);

const logout = () => {
    clearUser();
    navigateTo('/');
};

const updateConversations = () => {
  cognitoFetch('/conversation', null, true).then(({ data }) => {
    conversationData.value = data.value.conversations;
  });
}
updateConversations();

const flipDisplayCreateConvoModal = () => {
  displayCreateConvoModal.value = !displayCreateConvoModal.value;
};

const createConversation = () => {
  loadingState.value = true;
  const payload = {
    members: [],
    name: newConvoName.value
  };
  cognitoFetch('/conversation/create', payload, true).then(({ data, error }) => {
    loadingState.value = false;
    if (error.value === null) {
      updateConversations();
      flipDisplayCreateConvoModal();
    } else {
      errorState.value = true;
      errorMessage.value = error;
    }
  });
};

const setConversationId = (conversationId) => {
    selectedConversation.value = conversationId;
    getMessageData();
};

const getMessageData = () => {
    msgLoadingState.value = true;
    cognitoFetch(`/conversation/${selectedConversation.value}/message`, null, true).then(({ data, error }) => {
        messageData.value = data.value;
        msgLoadingState.value = false;
    });
};

</script>

<template>
  <div class="flex flex-col p-5 text-stone-200 bg-gradient-to-r from-teal-600 to-blue-600 w-screen h-screen">
    <div v-if="displayCreateConvoModal">
      <div :class="dynamicAnimationClass" class="flex flex-col content-center bg-cyan-900 p-12 rounded-xl">
        <div class="flex flex-col">
          <span class="text-4xl pr-2 pl-2 pt-2">Create New Conversation</span>
          <span class="text-xl pr-2 pl-2 pb-2">Please enter the attributes of the conversation below.</span>
          <div class="flex flex-col p-2">
            <label class="text-2xl" for="newConvoName">Conversation Name</label>
            <input v-model="newConvoName" class="text-stone-800 text-2xl rounded" name="newConvoName" type="text">
          </div>
          <div class="flex flex-row p-2 w-1/3">
            <div class="flex flex-col w-2/3 text-stone-100 text-2xl text-center m-3 ml-none p-3 bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600" @click="createConversation()">
              <img v-if="loadingState" class="h-8 w-8 m-auto" src="/assets/images/loading.gif">
              <span v-else>Create Conversation</span>
            </div>
            <div class="flex flex-col w-1/3 text-stone-100 text-2xl text-center m-3 p-3 bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600" @click="flipDisplayCreateConvoModal()">
              <span>Cancel</span>
            </div>
          </div>
          <div v-if="errorState">
            <div class="flex flex-col">
              <div class="text-red-500 p-2 inline-flex">
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-row">
        <div class="float-left m-auto flex-col text-stone-100 w-fit p-2 text-2xl text-center bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600" @click="flipDisplayCreateConvoModal()">
          <span>Create Conversation</span>
        </div>
        <div class="float-right m-auto flex-col text-stone-100 w-fit p-2 text-2xl text-center bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600" @click="logout()">
          <span>Log Out</span>
        </div>
      </div>

      <div class="flex flex-row p-2">
        <div class="w-1/4 flex flex-col">
          <div v-for="conversation of conversationData" :key="conversation.id" class="m-2 text-center p-3 bg-cyan-900 hover:bg-cyan-700 rounded-xl" @click="setConversationId(conversation.id)">
            <div>
              {{ conversation.name }}
            </div>
          </div>
        </div>
        <div class="w-3/4 m-2 p-3 flex flex-col bg-cyan-900 rounded-xl">
          <div class="flex flex-col">
            Messages
            <!-- Add messages from conversations -->
            <img v-if="msgLoadingState" src="/assets/images/loading.gif" class="h-20 w-20">
            <div v-for="message of messageData.messages" :key="message.sentDate" class="m-2">
              <div>{{ message.userProfile }}</div>
              <div>{{ message.body }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
