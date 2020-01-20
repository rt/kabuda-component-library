import { models } from 'kabuda-liquid';

/**
 * initialize with ui-data.form and store to session
 * ex. in action.validateText > store.getForm().changeText(val)
*/
export default class FormEx extends models.Form {
    changeFirstName(val) {
        this.getField('firstName').value = val;
    }
}
