import Reflux from 'reflux'
import lightActions from './lightActions'
import wsActions from "./wsActions";
import notificationActions from "./notificationActions";


//  Create unique Store for each Component
function GroupStoreFactory(id,  device_info, location){

    const visible = true;

    class GroupStore extends Reflux.Store {
        constructor() {
            super();

            this.state = { id:id,
                name: device_info.name,
                worker: device_info.worker,
                device_state: device_info.state,
                last_seen: device_info.last_seen,
                commands: device_info.commands,
                location: location,
                loading:false,
                visible: visible,
                status:'normal',
            };

            this.listenables = groupActions;

            // Bind it
            this.onMessage = this.onMessage.bind(this);
            this.doCommand = this.doCommand.bind(this);
            this.onSetColor = this.onSetColor.bind(this);
            this.onVisible = this.onVisible.bind(this);
            this.onSetBrightness = this.onSetBrightness.bind(this);
            this.onToggle = this.onToggle.bind(this);
            this.onOn = this.onOn.bind(this);
            this.onOff = this.onOff.bind(this);
            this.onSetScene = this.onSetScene.bind(this);
        }

        // WebSocket messenger
        doCommand(command, value) {
            const mess = {id:id, cmd:command,value: value};
            this.setState({'loading':true});
            wsActions.doCommand(mess);
        }

        // WebSocket listener
        onMessage (data) {
            if (data.id === id) {
                // let state = this.state.device_state;
                let state = data.state;
                this.setState({device_state: state,
                    loading:false,
                    status:'success'});

            }
        }

        // Actions
        onSetColor (dev_id, color) {
            if ( dev_id === id) {
                this.doCommand('set-color', color);
                this.setState({'loading':true});
            }
        }

        onSetBrightness (dev_id, level) {
            if ( dev_id === id ) {
                this.doCommand('set-brightness', level);
                this.setState({'loading':true});
            }
        }

        onOn (dev_id) {
            if ( dev_id === id ) {
                this.doCommand('on', "");
                this.setState({'loading':true});
            }
        }

        onOff (dev_id) {
            if ( dev_id === id ) {
                this.doCommand('off', "");
                this.setState({'loading':true});
            }
        }

        onToggle (dev_id) {
            if ( dev_id === id ) {
                this.doCommand('toggle', "");
                this.setState({'loading':true});
            }
        }

        onSetScene(dev_id, scene_item) {
            if ( dev_id === id ) {
                this.doCommand('set-scene', scene_item);
                this.setState({'loading':true});
            }
        }

        onVisible(location) {
            this.setState({visible: false});
            if (this.state.location === location) {
                this.setState({visible: true});
            }
        }

        onStatus(dev_id, status) {
            if ( dev_id === id ) {
                this.setState({status:status});
                if (status === 'error') {
                    this.setState({loading:false});
                    notificationActions.notification('The server does not respond, the command is not complete');
                }
            }
        }



    }

    GroupStore.id = id;
    return GroupStore
}

export default GroupStoreFactory