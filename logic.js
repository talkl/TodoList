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
    }
    handleChange(e) {
        e.preventDefault();
        this.props.toggleToDo(e.target);
    }
    render() {
        const completed = this.state.completedArray.map(
            (item, index) =>
            <li key={index} className="completed">
                <input value={item} onChange={this.handleChange} type="checkbox" name="completed" checked />
                {item}
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
    }
    handleChange(e) {
        e.preventDefault();
        this.props.toggleToDo(e.target);
    }
    render() {
        const todos = this.state.todoArray.map(
            (item, index) =>
            <li key={index} className="todo">
                <input value={item} onChange={this.handleChange} type="checkbox" name="todo"/>
                {item}
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
            todos: [],
            completed: []
        }
        this.addToDo = this.addToDo.bind(this);
        this.toggleToDo = this.toggleToDo.bind(this);
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
        console.log('the text of the checked box is: ' + checkbox.value);
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
    render() {
        return(
            <div className="items-container">
                <AddItem addToDo={this.addToDo} />
                <ToDoContainer toggleToDo={this.toggleToDo} pushedArray={this.state.todos} />
                <CompletedContainer toggleToDo={this.toggleToDo} pushedArray={this.state.completed} />
            </div>
        );
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []            
        }
    }
    render() {
        return(
            <div id="app-container">
                <Header></Header>
                <div>
                    {/* <Lists/> */}
                </div>
                <List />
                <div>
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