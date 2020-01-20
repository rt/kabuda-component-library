import RouteBase from '../../../component-library/src/components/RouteBase/RouteBase.auto';
import InputSelect from '../../../component-library/src/components/InputSelect/InputSelect.auto';
import Pager from '../../../component-library/src/components/Pager/Pager.auto';
import Table from '../../../component-library/src/components/Table/Table.auto';

export default class Tables extends RouteBase {
    getPath() {
        return '/reference/tables';
    }

    getId() {
        return this.camelize(this.constructor.name);
    }

    getInputSelect() {
        return this.getComponent(InputSelect);
    }

    getTable() {
        return this.getComponent(Table);
    }

    getPager() {
        return this.getComponent(Pager);
    }
}
