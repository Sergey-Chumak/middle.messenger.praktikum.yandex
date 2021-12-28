import Block from '../../services/block';
import { IState, StoreEvents } from '../../store/store.types';
import store from '../../store/store';

export default function connect<Props, Children>(mapStateToProps:(state: IState)=> IState) {
  return function (Component: typeof Block) {
    return class extends Component<Props, Children> {
      constructor(props: Props) {
        super('div', { ...props, ...mapStateToProps(store.getState()) });

        store.attach(StoreEvents.Updated, () => {
          this.setProps({ ...mapStateToProps(store.getState()) });
        });
      }
    };
  };
}
