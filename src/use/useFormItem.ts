import {inject} from 'vue';

export default ()=>{
    const formItem: any = inject('elFormItem');

    const formEmit = (value:any) => {
      if (formItem) {
        formItem.formItemMitt.emit('el.form.blur', value);
        formItem.formItemMitt.emit('el.form.change', value);
      }
    };
    return { formItem, formEmit }
}