<template>
    <div class="flex justify-center p-2 m-2">
        <div class="p-4 rounded w-full md:max-w-3xl ">
            <div class="bg-white shadow-2xl p-4 rounded-lg">
                <div class="text-center mb-3">
                    <div class="font-medium text-2xl mb-2">Вітаю!</div>
                    <span class="font-medium text-gray-600 ">{{ subtitleText }}</span>
                    <a class="text-blue-500 font-medium no-underline ml-2 cursor-pointer "
                        @mousedown.prevent="toggleAuth">{{ linkAccountText }}</a>
                </div>
                <form @submit.prevent="submitForm">
                    <label for="emailInput" class="block text-900 font-medium mb-2">Email</label>
                    <input type="email" id="emailInput" v-model="email" class="w-full mb-3 border rounded p-1 pl-2">

                    <label for="passwordInput" class="block text-900 font-medium mb-2">Password</label>
                    <input type="password" id="passwordInput" v-model="password"
                        class="w-full mb-3 border rounded p-1 pl-2">

                    <button
                        class="w-full px-5 py-2 text-base bg-blue-600 rounded-md border-none text-gray-100 hover:bg-blue-800"
                        type="submit" :loading="isLoading">{{ submitButtonText }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from "vue-router";
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


export default {
    setup() {
        const isLogin = ref(true);
        const email = ref('');
        const password = ref('');
        const isLoading = ref(false);
        const router = useRouter();
        
        const toggleAuth = () => {
            isLogin.value = !isLogin.value
        }

        const subtitleText = computed(() => {
            return isLogin.value ? "Ще немає аккаунта?" : "Вже маєте аккаунт?"
        })

        const linkAccountText = computed(() => {
            return isLogin.value ? "Створіть зараз" : "Ввійдіть в нього"
        })

        const submitButtonText = computed(() => {
            return isLogin.value ? "Увійти" : "Зареєструватись"
        })

        const signUp = async () => {
            isLoading.value = true;
            try {
                await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
                router.go()
            } catch (error) {
                toast.error(`${error}`, {
                    autoClose: 3000
                })
            } finally {
                isLoading.value = false;
            }
        }

        const signIn = async () => {
            isLoading.value = true;
            try {
                await signInWithEmailAndPassword(getAuth(), email.value, password.value);
                router.push('/home');
            } catch (error) {
                toast.error(`${error}`,{
                    autoClose: 3000
                })
            } finally {
                isLoading.value = false;
            }
        }

        const submitForm = () => {
            if (isLogin.value) {
                signIn()
            } else {
                signUp()
            }
        }

        return { subtitleText, linkAccountText, toggleAuth, email, password, submitButtonText, isLoading, submitForm, }
    }
}
</script>