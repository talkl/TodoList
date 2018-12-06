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
        this.state= {
            completedArray: this.props.pushedArray
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            completedArray: newProps.pushedArray
        })
    }
    handleChange(e) {
        e.preventDefault();
        this.props.toggleToDo(e.target);
    }
    handleDelete(e) {
        this.props.deleteFromList(e.target.previousSibling.previousSibling);
    }
    render() {
        const completed = this.state.completedArray.map(
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
        this.state = {
            todoArray: this.props.pushedArray
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            todoArray: newProps.pushedArray
        })
    }
    handleChange(e) {
        e.preventDefault();
        this.props.toggleToDo(e.target);
    }
    handleDelete(e) {
        this.props.deleteFromList(e.target.previousSibling.previousSibling);
    }
    render() {
        const todos = this.state.todoArray.map(
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
        this.state = {
            name: this.props.name,
            todos: this.props.todos,
            completed: this.props.completed
        }
        this.addToDo = this.addToDo.bind(this);
        this.toggleToDo = this.toggleToDo.bind(this);
        this.deleteFromList = this.deleteFromList.bind(this);
    }
    componentWillReceiveProps(newProps) {
        console.log('inside List component will recieve props');
        console.log(newProps.name);
        console.log(newProps.todos);
        console.log(newProps.completed);
        this.setState({
            name: newProps.name,
            todos: newProps.todos,
            completed: newProps.completed
        });
    }
    addToDo(input) {
        var newItem = input.value;
        var newArray = this.state.todos;
        newArray.push(newItem);
        this.setState({
            todos: newArray
        });
    }
    toggleToDo(checkbox) {
        if(checkbox.name === 'todo') {
            var newTodos = this.state.todos;
            var indexToRemove = newTodos.indexOf(checkbox.value);
            newTodos.splice(indexToRemove, 1);
            var newCompleted = this.state.completed;
            newCompleted.push(checkbox.value);
            this.setState({
                todos: newTodos,
                completed: newCompleted
            });
        } else if(checkbox.name === 'completed') {
            var newTodos = this.state.todos;
            newTodos.push(checkbox.value);
            var newCompleted = this.state.completed;
            var indexToRemove = newCompleted.indexOf(checkbox.value);
            newCompleted.splice(indexToRemove, 1);
            this.setState({
                todos: newTodos,
                completed: newCompleted
            });
        } else {
            console.log('unexpected checkbox name');
        }
    }
    deleteFromList(itemToDelete) {
        if(itemToDelete.name === 'todo') {
            var newTodos = this.state.todos;
            var indexToRemove = newTodos.indexOf(itemToDelete.value);
            newTodos.splice(indexToRemove, 1);
            this.setState({
                todos: newTodos
            });
        } else if(itemToDelete.name === 'completed') {
            var newCompleted = this.state.completed;
            var indexToRemove = newCompleted.indexOf(itemToDelete.value);
            newCompleted.splice(indexToRemove, 1);
            this.setState({
                completed: newCompleted
            });
        } else {
            console.log('unexpected checkbox name');
        }
    }
    render() {
        return(
            <div className="items-container">
                <AddItem addToDo={this.addToDo} />
                <ToDoContainer deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} pushedArray={this.state.todos} />
                <CompletedContainer deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} pushedArray={this.state.completed} />
            </div>
        );
    }
}
class ListMaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.activeList
        }
    }
    componentWillReceiveProps(newProps) {
        console.log('inside componentWillReceiveProps');
        console.log(newProps.activeList.todos);
        console.log(newProps.activeList.completed);
        this.setState({
            list: newProps.activeList
        });
    }
    render() {
        return(
            <div>
                <List name={this.state.list.name} todos={this.state.list.todos} completed={this.state.list.completed} />
            </div>
        );
    }
}
class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            names: this.props.names,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.changeActiveList(e);
    }
    render() {
        const lists = this.state.names.map(
            (name, index) => <button className="list-button" onClick={this.handleClick} key={index} value={name}>{name}</button>
        )
        return(
            <div id="lists-container">
                {lists}
            </div>
        );
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                },
                {
                    name: 'empty list',
                    todos: [],
                    completed: []
                }

            ],
            activeList: {
                name: null,
                todos: null,
                completed: null
            }   
        }
        this.changeActiveList = this.changeActiveList.bind(this);
    }
    changeActiveList(e) {
        console.log('the event target value is: ' + e.target.value);
        console.log('return todos is: ' +returnTodos(this.state.lists, e.target.value));
        console.log('return completed is: ' + returnCompleted(this.state.lists, e.target.value));
        this.setState({
            activeList: {
                name: e.target.value,
                todos: returnTodos(this.state.lists, e.target.value),
                completed: returnCompleted(this.state.lists, e.target.value)
            }
        });
    }
    render() {
        const names = this.state.lists.map(
            (list) => list.name 
        );
        console.log(names);
        console.log('active list is: ');
        console.log(this.state.activeList);
        return(
            <div>
                <Header></Header>
                <div id="app-container">
                    <div>
                        <Lists changeActiveList={this.changeActiveList} names={names} />
                    </div>
                    <div>
                        { this.state.activeList.name !== null &&
                        <ListMaker activeList={this.state.activeList}/>
                        }
                    </div>
                    <div>
                        {/* <ToDoDetails/> */}
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
);