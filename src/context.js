import React, { Component } from "react";
import item from "./data";

const RoomContext = React.createContext();
//<RoomContext.Provider value={'hello'}

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: "all",
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false,
    };
    //TODO: GetData

    componentDidMount() {
        //TODO: This.getData
        let rooms = this.formatData(item);
        let featuredRooms = rooms.filter((room) => room.featured === true);
        let maxPrice = Math.max(...rooms.map((item) => item.price));
        let maxSize = Math.max(...rooms.map((item) => item.price));
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize,
        });
    }

    formatData(items) {
        let tempItems = items.map((item) => {
            let id = item.sys.id;
            let images = item.fields.images.map((image) => image.fields.file.url);
            let room = { ...item.fields, images, id };
            return room;
        });
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room) => room.slug === slug);
        return room;
    };

    handleChange = (event) => {
        const target = event.target;
        const name = event.target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;
        this.setState(
            {
                [name]: value
            },
            this.filterRooms
        );
    };

    filterRooms = () => {
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
            this.state;

        //TODO: All the rooms
        let tempRooms = [...rooms];

        //TODO: Transform Value
        capacity = parseInt(capacity);

        //TODO: Filter by type
        if (type !== "all") {
            tempRooms = tempRooms.filter((room) => room.type === type);
        }

        //TODO: Filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
        }

        //TODO: Filter by price
        tempRooms = tempRooms.filter((room) => room.price <= price);

        //TODO: Filter by size
        tempRooms = tempRooms.filter((room) => room.size >= minSize && room.size <= maxSize);

        //TODO: Filter by breakfast
        if(breakfast) {
            tempRooms = tempRooms.filter((room) => room.breakfast === true);
        }

        //TODO: Filter by pets
        if(pets) {
            tempRooms = tempRooms.filter((room) => room.pets === true);
        }

        //TODO: Change state
        this.setState({
            sortedRooms: tempRooms,
        });
    };

    render() {
        return (
            <RoomContext.Provider
                value={{
                    ...this.state,
                    getRoom: this.getRoom,
                    handleChange: this.handleChange,
                }}
            >
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
                {(value) => <Component {...props} context={value} />}
            </RoomConsumer>
        );
    };
}

export { RoomProvider, RoomConsumer, RoomContext };
