class Header extends React.Component {
    render() {
        return (
            <h1 id="header">Doc Brown Todo Lists</h1>
        );
    }
}
class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.addToDo(this.input);
        this.input.value = ''; //clearing the input bar after submitting a to-do item
    }
    render() {
        return (
            <form id="form" onSubmit={this.handleSubmit}>
                <input className="input" ref={(input) => { this.input = input }} type="text" placeholder="add to-do"></input>
            </form>
        );
    }
}
class CompletedContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        this.props.toggleToDo(e.target);
    }
    handleDelete(e) {
        this.props.deleteFromList(e.target.previousSibling.previousSibling);
    }
    render() {
        const completed = this.props.pushedArray.map(
            (item, index) =>
            <li key={index} className="item completed">
                <input value={item} onChange={this.handleChange} type="checkbox" name="completed" checked />
                {item}
                <span onClick={this.handleDelete} className="delete">&nbsp;&#10007;&nbsp;</span>
            </li>
        )
        return (
            <ul className="container">
                {completed}
            </ul>
        );
    }
}
class ToDoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        this.props.toggleToDo(e.target);
    }
    handleDelete(e) {
        this.props.deleteFromList(e.target.previousSibling.previousSibling);
    }
    render() {
        const todos = this.props.pushedArray.map(
            (item, index) =>
            <li key={index} className="item todo">
                <input value={item} onChange={this.handleChange} type="checkbox" name="todo"/>
                {item}
                <span onClick={this.handleDelete} className="delete">&nbsp;&#10007;&nbsp;</span>
            </li>
        )
        return(
            <ul className="container">
                {todos}
            </ul>
        );
    }
}
class List extends React.Component {
    constructor(props) {
        super(props);
        this.addToDo = this.addToDo.bind(this);
        this.toggleToDo = this.toggleToDo.bind(this);
        this.deleteFromList = this.deleteFromList.bind(this);
    }
    addToDo(input) {
        this.props.addToDo(input, this.props.name);
    }
    toggleToDo(checkbox) {
        this.props.toggleToDo(checkbox, this.props.name);
    }
    deleteFromList(itemToDelete) {
        this.props.deleteFromList(itemToDelete, this.props.name);
    }
    render() {
        return(
            <div className="items-container">
                <h2>{this.props.name}</h2>
                <AddItem addToDo={this.addToDo} />
                <ToDoContainer deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} pushedArray={this.props.todos} />
                <CompletedContainer deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} pushedArray={this.props.completed} />
            </div>
        );
    }
}
class ListMaker extends React.Component {
    constructor(props) {
        super(props);
        this.addToDo= this.addToDo.bind(this);
        this.toggleToDo = this.toggleToDo.bind(this);
        this.deleteFromList = this.deleteFromList.bind(this);
    }
    deleteFromList(itemToDelete, name) {
        this.props.deleteFromList(itemToDelete, name);
    }
    toggleToDo(checkbox, name) {
        this.props.toggleToDo(checkbox, name);
    }
    addToDo(input, name) {
        this.props.addToDo(input, name);
    }
    render() {
        return(
            <div id="active-list">
                <List deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} addToDo={this.addToDo} name={this.props.activeList.name} todos={this.props.activeList.todos} completed={this.props.activeList.completed} />
            </div>
        );
    }
}
class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.addList = this.addList.bind(this);
    }
    handleClick(e) {
        this.props.changeActiveList(e);
    }
    addList() {
        var userInput = prompt("enter list's name");
        this.props.addList(userInput);
    }
    render() {
        const listsButtons = this.props.lists.map(
            (list, index) => <button className="list-button" onClick={this.handleClick} key={index} value={list.name}>{list.name}</button>
        )
        return(
            <div id="lists-container">
                {listsButtons}
                <button className="list-button" id="add-list" onClick={this.addList}>+</button>
            </div>
        );
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            activeList: null
        }
        this.changeActiveList = this.changeActiveList.bind(this);
        this.addList = this.addList.bind(this);
        this.addToDo = this.addToDo.bind(this);
        this.toggleToDo = this.toggleToDo.bind(this);
        this.deleteFromList = this.deleteFromList.bind(this);
        this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
        this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(this);
    }
    hydrateStateWithLocalStorage() {
        if(localStorage.getItem('lists')) {
            let savedLists = JSON.parse(localStorage.getItem('lists'));
            this.setState({
                lists: savedLists
            });
        } else { //default lists if no local storage is found
            this.setState({
                lists: [
                    {
                        name: 'groceries',
                        todos: ['banana', 'apple', 'eggs'],
                        completed: ['water', 'diet coca-cola']
                    },
                    {
                        name: 'study',
                        todos: [],
                        completed: ['history', 'science']
                    }
                ],
            });
        }
    }
    saveStateToLocalStorage() {
        localStorage.setItem('lists', JSON.stringify(this.state.lists));
    }
    componentDidMount() {
        this.hydrateStateWithLocalStorage();

        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }
    changeActiveList(e) {
        this.setState({
            activeList: {
                name: e.target.value,
                todos: returnTodos(this.state.lists, e.target.value),
                completed: returnCompleted(this.state.lists, e.target.value)
            }
        });
    }
    deleteFromList(itemToDelete, name) {
        var newLists = this.state.lists;
        for (var i = 0; i < newLists.length; i++) {
            if (newLists[i].name === name) {
                if (itemToDelete.name === 'todo') {
                    var indexToRemove = newLists[i].todos.indexOf(itemToDelete.value);
                    newLists[i].todos.splice(indexToRemove, 1);
                    this.setState({
                        lists: newLists
                    });
                } else if (itemToDelete.name === 'completed') {
                    var indexToRemove = newLists[i].completed.indexOf(itemToDelete.value);
                    newLists[i].completed.splice(indexToRemove, 1);
                    this.setState({
                        lists: newLists
                    });
                } else {
                    console.log('unexpected checkbox name');
                }
                break;
            }
        }
    }
    //new code
    toggleToDo(checkbox, name) {
        var newLists = this.state.lists;
        for(var i=0; i <newLists.length; i++) {
            if(newLists[i].name === name) {
                if (checkbox.name === 'todo') {
                    var indexToRemove = newLists[i].todos.indexOf(checkbox.value);
                    newLists[i].todos.splice(indexToRemove, 1);
                    newLists[i].completed.push(checkbox.value);
                    this.setState({
                        lists: newLists
                    });
                } else if (checkbox.name === 'completed') {
                    newLists[i].todos.push(checkbox.value);
                    var indexToRemove = newLists[i].completed.indexOf(checkbox.value);
                    newLists[i].completed.splice(indexToRemove, 1);
                    this.setState({
                        lists: newLists
                    });
                } else {
                    console.log('unexpected checkbox name');
                }
                break;
            }
        }
    } //end of new code
    //new code in order to save all changes in the app parent
    addToDo(input, name) {
        var newItem = input.value;
        var newLists = this.state.lists;
        for(var i=0; i < newLists.length; i++) {
            if(newLists[i].name === name) {
                newLists[i].todos.push(newItem);
                break;
            }
        }
        this.setState({
            lists: newLists
        });
    }
    //end of new code
    addList(input) {
        var newList = {};
        newList.name = input;
        newList.todos = [];
        newList.completed = [];
        var currentLists = this.state.lists;
        currentLists.push(newList);
        this.setState({
            lists: currentLists,
            activeList: {
                name: newList.name,
                todos: newList.todos,
                completed: newList.completed
            }
        });
    }
    render() {
        console.log(this.state.lists);
        return(
            <div>
                <Header></Header>
                <div id="app-container">
                    <Lists addList={this.addList} changeActiveList={this.changeActiveList} lists={this.state.lists} />
                    { this.state.activeList !== null &&
                    <ListMaker deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} addToDo={this.addToDo} activeList={this.state.activeList}/>
                    }
                    {/* <ToDoDetails/> */}
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
);