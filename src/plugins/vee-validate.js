import { defineRule, configure, ErrorMessage, Form, Field } from 'vee-validate';
import { required, email, min, max } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

configure({
  generateMessage: localize('zh_TW'),
});

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

export default {
  install(app) {
    app.component('VForm', Form);
    app.component('VField', Field);
    app.component('ErrorMessage', ErrorMessage);
  },
};
