<script setup>
const conversationData = ref([]);
const messageData = ref([]);
const selectedConversation = ref('');

const logout = () => {
    clearUser();
    navigateTo('/');
};

cognitoFetch('/conversation', null, true).then(({ data }) => {
    conversationData.value = data.value.conversations;
});

// const getConversationData = async () => {
//     // TODO: Add error handling
//     const { data, error } = await cognitoFetch('/conversation', null, true);
//     conversationData.value = data.value.conversations;
// };

const setConversationId = (conversationId) => {
    selectedConversation.value = conversationId;
    getMessageData();
};

const getMessageData = () => {
    cognitoFetch(`/conversation/${selectedConversation.value}/message`, null, true).then(({ data, error }) => {
        messageData.value = data.value;
    });
};

</script>

<template>
  <div class="flex flex-col p-5 text-stone-200 bg-gradient-to-r from-teal-600 to-blue-600 w-screen h-screen">
    <div class="flex flex-col text-stone-100 w-fit m-4 p-2 text-2xl text-center bg-violet-500 rounded-xl hover:bg-violet-400 active:bg-violet-600" @click="logout()">
      <span>Log Out</span>
    </div>
    <div class="flex flex-row p-2">
      <div class="w-1/4 flex flex-col">
        <div v-for="conversation of conversationData" :key="conversation.id" :on-click="setConversationId(conversation.id)" class="m-2 text-center p-3 bg-cyan-900 hover:bg-cyan-700 rounded-xl">
          <div>
            {{ conversation.name }}
          </div>
        </div>
      </div>
      <div class="w-3/4 m-2 p-3 flex flex-col bg-cyan-900 p-12 rounded-xl">
        <div class="flex flex-col">
          Messages
          <!-- Add messages from conversations -->
        </div>
      </div>
    </div>
  </div>
</template>
