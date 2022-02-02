import View from '../../services/view/view';
import { IState, EStoreEvents } from '../../store/store.types';
import store from '../../store/store';

export default function connect<Props, Children>(mapStateToProps:(state: IState) => { [key: string]: any }) {
  return function (Component: typeof View) {
    return class extends Component<Props, Children> {
      constructor(props: Props) {
        super('div', { ...props, ...mapStateToProps(store.getState()) });

        store.attach(EStoreEvents.Updated, () => {
          this.setProps({ ...mapStateToProps(store.getState()) });
        });
      }
    };
  };
}
