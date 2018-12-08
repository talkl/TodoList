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
        this.props.addToDo(this.input, this.date.value);
        this.input.value = ''; //clearing the input bar after submitting a to-do item
    }
    render() {
        $(function () {
            $(".datepicker").datepicker();
        });
        return (
            <div>
                <form id="form" onClick={(e) => e.stopPropagation()} onSubmit={this.handleSubmit}>
                    <input className="input" ref={(input) => { this.input = input }} type="text" placeholder="add to-do"></input>
                </form>
                Due date
                <input ref={(date) => {this.date = date}} onClick={(e) => e.stopPropagation()} type="text" className="datepicker" />
            </div>
        );
    }
}
class CompletedContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleStar = this.handleStar.bind(this);
        this.isStar = this.isStar.bind(this);
        this.openPanel = this.openPanel.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        this.props.toggleToDo(e.target);
    }
    handleDelete(e) {
        e.stopPropagation();
        this.props.deleteFromList(e.target.parentElement.textContent, e.target.parentElement);
    }
    handleStar(e) {
        //toggle star whether is inside to-do or completed
        e.stopPropagation();
        this.props.toggleStar(e.target.parentElement.textContent, e.target.classList, e.target.parentElement.classList);
    }
    isStar(starsArray, itemName) {
        return isStar(starsArray, itemName);
    }
    openPanel(e) {
        e.stopPropagation();
        this.props.openPanel(e.target.textContent, e.target.classList, e.target.childNodes);
    }
    render() {
        const completed = this.props.pushedArray.map(
            (item, index) =>
                <li key={index} onClick={this.openPanel} className={`item completed ${this.props.activePanelTitle === item.title ? 'active' : ''}`}>
                    <input value={item.title} onClick={(e) => e.stopPropagation() } onChange={this.handleChange} type="checkbox" name="completed" checked />
                    <span onClick={(e) => e.stopPropagation()}>{item.title}</span>
                    {
                    (this.isStar(this.props.stars, item.title) &&
                    <span onClick={this.handleStar} className="fa fa-star star"></span>
                    )
                    ||
                    <span onClick={this.handleStar} className="fa fa-star-o star"></span>
                    }
                    <span onClick={this.handleDelete} className="fa fa-trash delete"></span>
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
            editActive: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleStar = this.handleStar.bind(this);
        this.isStar = this.isStar.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.revealInput = this.revealInput.bind(this);
        this.resizeInputWidth = this.resizeInputWidth.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        this.props.toggleToDo(e.target);
    }
    handleDelete(e) {
        e.stopPropagation();
        this.props.deleteFromList(e.target.parentElement.textContent, e.target.parentElement);
    }
    handleStar(e) {
        e.stopPropagation();
        //toggle star whether is inside to-do or completed
        this.props.toggleStar(e.target.parentElement.textContent, e.target.classList, e.target.parentElement.classList);
    }
    isStar(starsArray, itemName) {
        return isStar(starsArray, itemName);
    }
    openPanel(e) {
        e.stopPropagation();
        this.props.openPanel(e.target.textContent, e.target.classList, e.target.childNodes);
    }
    editTodo(e) {
        console.log('inside editTodo');
        console.log('defaultValue is: ' + this.input.defaultValue);
        e.preventDefault();
        this.setState({
            editActive: false
        });
        this.props.editTodo(this.input.value, this.input.defaultValue);
    }
    revealInput(e) {
        e.stopPropagation();
        this.setState({
            editActive: e.target.textContent
        });
    }
    resizeInputWidth(e) {
        const inputWidth = parseInt(window.getComputedStyle(e.target).getPropertyValue('width'));
        if (inputWidth < 400) {
            e.target.style.width = e.target.value.length + "ch";
        }
    }
    render() {
        const todos = this.props.pushedArray.map(
            (item, index) =>
            <li key={index} onClick={this.openPanel} className={`item todo ${this.props.activePanelTitle === item.title ? 'active' : ''}`}>
                <input value={item.title} onClick={(e) => e.stopPropagation()} onChange={this.handleChange} type="checkbox" name="todo"/>
                { (this.state.editActive === item.title &&
                <form className="edit-form" onClick={(e) => e.stopPropagation()} onSubmit={this.editTodo}>
                    <input onKeyPress={this.resizeInputWidth} ref={(input) => { this.input = input }} type="text" size={`${item.title.length}`} defaultValue={item.title} placeholder="enter to edit your to-do"></input>
                </form>)
                ||
                <span onClick={this.revealInput}>{item.title}</span>
                }
                {
                (this.isStar(this.props.stars, item.title) &&
                <span onClick={this.handleStar} className="fa fa-star star"></span>
                )
                ||
                <span onClick={this.handleStar} className="fa fa-star-o star"></span>
                }
                <span onClick={this.handleDelete} className="fa fa-trash delete"></span>
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
        this.toggleStar = this.toggleStar.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }
    addToDo(input, due_date) {
        this.props.addToDo(input, due_date, this.props.name);
    }
    toggleToDo(checkbox) {
        this.props.toggleToDo(checkbox, this.props.name);
    }
    deleteFromList(itemToDelete, parentElement) {
        this.props.deleteFromList(itemToDelete, this.props.name, parentElement);
    }
    toggleStar(itemText, starClassList, parentClassList) {
        this.props.toggleStar(itemText, this.props.name, starClassList, parentClassList);
    }
    openPanel(itemText, parentClass, childNodes) {
        this.props.openPanel(itemText, parentClass, childNodes, this.props.name);
    }
    editTodo(inputValue, defaultValue) {
        this.props.editTodo(inputValue, defaultValue, this.props.name);
    }
    render() {
        return(
            <div className="items-container">
                <h2 id="list-name">{this.props.name}</h2>
                <AddItem addToDo={this.addToDo} />
                <ToDoContainer editTodo={this.editTodo} activePanelTitle={this.props.activePanelTitle} openPanel={this.openPanel} toggleStar={this.toggleStar} stars={this.props.stars} deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} pushedArray={this.props.todos} />
                <CompletedContainer activePanelTitle={this.props.activePanelTitle} openPanel={this.openPanel} toggleStar={this.toggleStar} stars={this.props.stars} deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} pushedArray={this.props.completed} />
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
        this.exitHover = this.exitHover.bind(this);
        this.enterHover = this.enterHover.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.toggleStar = this.toggleStar.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.closePanel = this.closePanel.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }
    deleteFromList(itemToDelete, name, parentElement) {
        this.props.deleteFromList(itemToDelete, name, parentElement);
    }
    toggleToDo(checkbox, name) {
        this.props.toggleToDo(checkbox, name);
    }
    addToDo(input, due_date, name) {
        this.props.addToDo(input, due_date, name);
    }
    enterHover() {
        this.trash.classList.remove('hidden');
    }
    exitHover() {
        this.trash.classList.add('hidden');
    }
    deleteList() {
        this.props.deleteList(this.props.activeList.name);
    }
    toggleStar(itemText, listName, starClassList, parentClassList) {
        this.props.toggleStar(itemText, listName, starClassList, parentClassList);
    }
    openPanel(itemText, parentClass, childNodes, listName) {
        this.props.openPanel(itemText, parentClass, childNodes, listName);
    }
    closePanel() {
        this.props.closePanel();
    }
    editTodo(inputValue, defaultValue, listName) {
        this.props.editTodo(inputValue, defaultValue, listName);
    }
    render() {
        return(
            <div onClick={this.closePanel} onMouseLeave={this.exitHover} onMouseEnter={this.enterHover} id="active-list">
                <span onClick={this.deleteList} ref={(trash) => {this.trash = trash}} className="fa fa-trash hidden trash"></span>
                <List editTodo={this.editTodo} activePanelTitle={this.props.activePanelTitle} openPanel={this.openPanel} toggleStar={this.toggleStar} stars={this.props.activeList.stars} deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} addToDo={this.addToDo} name={this.props.activeList.name} todos={this.props.activeList.todos} completed={this.props.activeList.completed} />
            </div>
        );
    }
}
class Lists extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.addList = this.addList.bind(this);
        this.closePanel = this.closePanel.bind(this);
    }
    handleClick(e) {
        var parentWrapper = e.target.parentElement;
        for (var i = 0; i < parentWrapper.childNodes.length; i++) {
            if (parentWrapper.childNodes[i].classList.contains('active')) {
                parentWrapper.childNodes[i].classList.remove('active');
                break;
            }
        }
        e.target.classList.add('active');
        this.props.changeActiveList(e);
    }
    addList() {
        this.props.addList();
    }
    closePanel() {
        this.props.closePanel();
    }
    render() {
        const listsButtons = this.props.lists.map(
            (list, index) => <button className="list-button" onClick={this.handleClick} key={index} value={list.name}>
            {list.name}
            </button>
        )
        return(
            <div onClick={this.closePanel} id="lists-container">
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
            activeList: null,
            activePanel: {
                isActive: false,
                listName: null,
                title: null,
                description: null,
                due_date: null
            }
        }
        this.changeActiveList = this.changeActiveList.bind(this);
        this.addList = this.addList.bind(this);
        this.addToDo = this.addToDo.bind(this);
        this.toggleToDo = this.toggleToDo.bind(this);
        this.deleteFromList = this.deleteFromList.bind(this);
        this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
        this.hydrateStateWithLocalStorage = this.hydrateStateWithLocalStorage.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.toggleStar = this.toggleStar.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.closePanel = this.closePanel.bind(this);
        this.editTodo = this.editTodo.bind(this);
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
                        name: 'DeLorean sports car',
                        stars: ['natural gas'],
                        todos: [
                            {
                                title: 'Quantomphysics',
                                due_date: '27/10/1999',
                                description: 'I need to work on the shredinger Cat'
                            },
                            {
                                title: 'natural gas',
                                due_date: '1/1/2000',
                                description: '2000 bug'
                            },
                            {
                                title: 'flying?',
                                due_date: '13/05/2005',
                                description: 'finalizing the steps'
                            }
                            ],
                        completed: [
                            {
                                title: 'time travel',
                                due_date: '6/5/2008',
                                description: 'traveling back in time takes a lot of time'
                            },
                            {
                                title: '100kmh',
                                due_date: '31/12/1999',
                                description: 'my description'
                            }
                        ]
                    },
                    {
                        name: 'Marty',
                        stars: [],
                        todos: [],
                        completed: [
                            {
                                title: 'girlfriend',
                                due_date: '8/12/2018',
                                description: 'finding Marty a girlfriend'
                            },
                            {
                                title: 'visiting his parents',
                                due_date: '3/12/2005',
                                description: 'suspicious'
                            }
                        ]
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
                completed: returnCompleted(this.state.lists, e.target.value),
                stars: returnStars(this.state.lists, e.target.value)
            }
        });
    }
    deleteFromList(itemToDelete, name, parentElement) {
        var newLists = this.state.lists;
        for (var i = 0; i < newLists.length; i++) {
            if (newLists[i].name === name) {
                for(var j=0; j < newLists[i].stars.length; j++) {
                    if(newLists[i].stars[j] === itemToDelete) {
                        newLists[i].stars.splice(j,1);
                        break;
                    }
                }
                if (parentElement.classList.contains('todo')) {
                    for(let k=0; k < newLists[i].todos.length; k++) {
                        if (newLists[i].todos[k].title === itemToDelete) {
                            newLists[i].todos.splice(k, 1);
                            break;
                        } 
                    }
                } else if (parentElement.classList.contains('completed')) {
                    for (let k = 0; k < newLists[i].completed.length; k++) {
                        if (newLists[i].completed[k].title === itemToDelete) {
                            newLists[i].completed.splice(k, 1);
                            break;
                        }
                    }
                } else {
                    console.log('unexpected classList name of <li/> item');
                }
                this.setState({
                    lists: newLists
                });
                break;
            }
        }
        if(itemToDelete === this.state.activePanel.title) {
            this.closePanel();
        }
    }
    //new code
    toggleToDo(checkbox, name) {
        var newLists = this.state.lists;
        for(var i=0; i <newLists.length; i++) {
            if(newLists[i].name === name) {
                if (checkbox.name === 'todo') {
                    for (let k = 0; k < newLists[i].todos.length; k++) {
                        if (newLists[i].todos[k].title === checkbox.value) {
                            let newCompleted = newLists[i].todos[k];
                            newLists[i].completed.push(newCompleted)
                            newLists[i].todos.splice(k, 1);
                            break;
                        }
                    }
                    this.setState({
                        lists: newLists
                    });
                } else if (checkbox.name === 'completed') {
                    for (let k = 0; k < newLists[i].completed.length; k++) {
                        if (newLists[i].completed[k].title === checkbox.value) {
                            let newTodo = newLists[i].completed[k];
                            newLists[i].todos.push(newTodo)
                            newLists[i].completed.splice(k, 1);
                            break;
                        }
                    }
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
    addToDo(input, due_date, name) {
        var newItem = input.value;
        var newLists = this.state.lists;
        for(var i=0; i < newLists.length; i++) {
            if(newLists[i].name === name) {
                var newTodo = {};
                newTodo.title = newItem;
                if(due_date !== '') {
                    newTodo.due_date = due_date;
                } else {
                    newTodo.due_date = null;
                }
                newTodo.description = null;
                newLists[i].todos.push(newTodo);
                break;
            }
        }
        this.setState({
            lists: newLists
        });
    }
    //end of new code
    addList() {
        var userInput = prompt("please enter list's name");
        while(userInput === '' || listExist(userInput, this.state.lists)) {
            userInput = prompt("please enter list's name (1 char at least, only names that do not exist)");
        } 
        if(userInput) { //if user doesn't cancel
            var parentWrapper = document.querySelector('#lists-container');
            for (var i = 0; i < parentWrapper.childNodes.length; i++) {
                if (parentWrapper.childNodes[i].classList.contains('active')) {
                    parentWrapper.childNodes[i].classList.remove('active');
                    break;
                }
            }
            var newList = {};
            newList.name = userInput;
            newList.todos = [];
            newList.completed = [];
            newList.stars = [];
            var currentLists = this.state.lists;
            currentLists.push(newList);
            this.setState({
                lists: currentLists,
                activeList: {
                    name: newList.name,
                    todos: newList.todos,
                    completed: newList.completed,
                    stars: newList.stars
                }
            });
        }
    }
    deleteList(nameOfListToDelete) {
        var currentLists = this.state.lists;
        for (var i = 0; i < currentLists.length; i++) {
            if (currentLists[i].name === nameOfListToDelete) {
                var indexToDelete = i;
                currentLists.splice(indexToDelete, 1);
                this.setState({
                    lists: currentLists,
                    activeList: null
                });
                break;
            }
        }
    }
    toggleStar(itemText, listName, starClassList, parentClassList) {
        var newLists = this.state.lists;
        for (var i = 0; i < newLists.length; i++) {
            if (newLists[i].name === listName) {
                if(newLists[i].stars === undefined) {
                    newLists[i].stars = [];
                }
                if(starClassList.contains('fa-star-o')) {
                    //only if toggle happened in to-do
                    if(parentClassList.contains('todo')) {
                        for (let k = 0; k < newLists[i].todos.length; k++) {
                            if (newLists[i].todos[k].title === itemText) {
                                let currentTodo = newLists[i].todos[k];
                                newLists[i].todos.splice(k, 1);
                                newLists[i].todos.unshift(currentTodo);
                                break;
                            }
                        }
                    }
                    newLists[i].stars.push(itemText);
                } else if (starClassList.contains('fa-star')) {
                    newLists[i].stars.splice(newLists[i].stars.indexOf(itemText), 1);
                } else {
                    console.log('starClassList doesnt not contain either fa-star or fa-star-o');
                }
                break;
            }
        }
        this.setState({
            lists: newLists
        });
    }
    openPanel(itemText, parentClass, childNodes, listName) {
        var itemDescription = '';
        var dueDate = '';
        var currentLists = this.state.lists;
        for(var i=0; i < currentLists.length; i++) {
            if(currentLists[i].name === listName) {
                if(parentClass.contains('todo')) {
                    for (var k = 0; k < currentLists[i].todos.length; k++) {
                        if (currentLists[i].todos[k].title === itemText) {
                            itemDescription = currentLists[i].todos[k].description;
                            dueDate = currentLists[i].todos[k].due_date;
                            break;
                        }
                    }
                } else if (parentClass.contains('completed')) {
                    for (var k = 0; k < currentLists[i].completed.length; k++) {
                        if (currentLists[i].completed[k].title === itemText) {
                            itemDescription = currentLists[i].completed[k].description;
                            dueDate = currentLists[i].completed[k].due_date;
                            break;
                        }
                    }
                }
                else {
                    console.log("parentClass doesn't contains completed or todo");
                }
                break;
            }
        }
        this.setState({
            activePanel: {
                isActive: true,
                listName: listName,
                title: itemText,
                description: itemDescription,
                due_date: dueDate
            }
        });
    }
    closePanel() {
        this.setState({
            activePanel: {
                isActive: false,
                listName: null,
                title: null,
                description: null,
                due_date: null
            }
        })
    }
    editTodo(inputValue, defaultValue, listName) {
        console.log(inputValue);
        console.log(listName);
        var newLists = this.state.lists;
        for (var i = 0; i < newLists.length; i++) {
            if (newLists[i].name === listName) {
                console.log('inside newLists[i].name');
                console.log(newLists[i].todos.length);
                console.log(newLists[i].todos[0].title);
                for(var k=0; k < newLists[i].todos.length; k++) {
                    if(newLists[i].todos[k].title === defaultValue) {
                        console.log('inside title===inputvalue');
                        console.log(newLists[i].todos[k].title);
                        newLists[i].todos[k].title = inputValue;
                        break;    
                    }
                }
                break;
            }
        }
        this.setState({
            lists: newLists
        });
    }
    render() {
        console.log(this.state.lists);
        return(
            <div>
                <Header></Header>
                <div id="app-container">
                    <Lists closePanel={this.closePanel} addList={this.addList} changeActiveList={this.changeActiveList} lists={this.state.lists} />
                    { this.state.activeList !== null &&
                    <ListMaker editTodo={this.editTodo} activePanelTitle={this.state.activePanel.title} closePanel={this.closePanel} openPanel={this.openPanel} toggleStar={this.toggleStar} deleteList={this.deleteList} deleteFromList={this.deleteFromList} toggleToDo={this.toggleToDo} addToDo={this.addToDo} activeList={this.state.activeList}/>
                    }
                    <Panel class={this.state.activePanel.isActive ? 'is-active' : 'not-active'} listName={this.state.activePanel.listName} title={this.state.activePanel.title} description={this.state.activePanel.description} due_date={this.state.activePanel.due_date} />
                </div>
            </div>
        );
    }
}
class Panel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id="panel" className={`${this.props.class}`}>
                <p>{this.props.title}</p>
                <p>description: {this.props.description}</p>
                <p>due date: {this.props.due_date}</p>
            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
);