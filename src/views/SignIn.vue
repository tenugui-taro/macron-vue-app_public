<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" align="center">
        <ValidationObserver v-slot="{ invalid }">
          <ValidationProvider
            v-slot="{ errors }"
            :name="vTEXT_FIELD_LABEL[0]"
            :rules="
              showErrorMessages
                ? validationRules.username
                : validationRules.base
            "
          >
            <v-text-field
              v-model="inputUsername"
              :label="vTEXT_FIELD_LABEL[0]"
              :error-count="1"
              :error-messages="showErrorMessages ? errors : null"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            :name="vTEXT_FIELD_LABEL[1]"
            :rules="
              showErrorMessages
                ? validationRules.password
                : validationRules.base
            "
          >
            <v-text-field
              v-model="inputPassword"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :label="vTEXT_FIELD_LABEL[1]"
              :error-count="1"
              :error-messages="showErrorMessages ? errors : null"
              @click:append="showPassword = !showPassword"
            />
          </ValidationProvider>
          <v-btn :disabled="invalid || isProcessing" @click="signIn()"
            >Go</v-btn
          >
        </ValidationObserver>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
} from '@vue/composition-api';
import { validate } from 'vee-validate';
import { ValidationItems } from '@/validations/validation-items';

const vTEXT_FIELD_LABEL = ['ユーザーネーム', 'パスワード'];

export default defineComponent({
  setup(props, context) {
    const state = reactive({
      inputUsername: '', // 入力されたユーザーネーム
      inputPassword: '', // 入力されたパスワード
      showPassword: false, // パスワードの表示制御
      showErrorMessages: false, // エラーメッセージの表示制御
      isProcessing: false, // サインイン処理の実行制御
      validationRules: computed(() => {
        // バリデーションルール
        return {
          base: {
            required: true,
          },
          username: {
            required: true,
            ...ValidationItems.username,
          },
          password: {
            required: true,
            ...ValidationItems.password,
          },
        };
      }),
    });

    /**
     * ボタンによって呼び出されるサインイン処理
     */
    const signIn = async () => {
      // 状態を処理中にしてボタンを非活性化
      state.isProcessing = true;

      // 最初のエラーメッセージを表示していないときのみ実行
      if (!state.showErrorMessages) {
        // バリデーションルールに適しているかチェック
        if ((await isInvalidUsername()) || (await isInvalidPassword())) {
          // 適していなければ処理中断
          state.showErrorMessages = true;
          state.isProcessing = false;
          return;
        }
      }
      try {
        // await userStore.signInAsync({
        //   username: state.inputUsername,
        //   password: state.inputPassword,
        // });
        // context.root.$router.push(
        //   '/',
        //   () => {
        //     /* */
        //   },
        //   () => {
        //     /* */
        //   },
        // );
      } catch (e) {
        state.isProcessing = false;
        // [TODO]ユーザーへのフィードバック
      }
    };

    /**
     * ユーザーネームのバリデーション
     * @return {boolean} isInvalid
     */
    const isInvalidUsername = () => {
      return new Promise((resolve) => {
        let isInvalid = false;
        validate(state.inputUsername, state.validationRules.username, {
          name: vTEXT_FIELD_LABEL[0],
        }).then((result) => {
          if (!result.valid) {
            isInvalid = true;
          }
          resolve(isInvalid);
        });
      });
    };

    /**
     * パスワードのバリデーション
     * @return {boolean} isInvalid
     */
    const isInvalidPassword = () => {
      return new Promise((resolve) => {
        let isInvalid = false;
        validate(state.inputPassword, state.validationRules.password, {
          name: vTEXT_FIELD_LABEL[1],
        }).then((result) => {
          if (!result.valid) {
            isInvalid = true;
          }
          resolve(isInvalid);
        });
      });
    };

    return {
      ...toRefs(state),
      vTEXT_FIELD_LABEL,
      signIn,
    };
  },
});
</script>
