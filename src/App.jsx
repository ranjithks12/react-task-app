import { useState } from "react";
import FallBackContent from "./components/FallBackContent.jsx";
import NewProject from "./components/NewProject.jsx";
import SideBar from "./components/SideBar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects:[],
    tasks:[]
  });

  function handelAddTask(taskData) { 
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        taskData: taskData,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handelDeleteTask(taskId) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== taskId),
      };
    })
  }

  function handelSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    })
  }

  function handelDeletProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    })
  }

  function handelStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    })
  }

  function handelCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    })
  }

  function handelOnAddProject(projectData) {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      };

      return{
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects, newProject]
      };
    })
  }
  console.log(projectsState)

  let selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = <SelectedProject 
                  project={selectedProject} 
                  onDelete={handelDeletProject}
                  onAddTask={handelAddTask} 
                  onDeleteTask={handelDeleteTask}
                  tasks={projectsState.tasks}
                />;

  if(projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handelOnAddProject} onCancel={handelCancelAddProject}/>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <FallBackContent onStartAddProjecr={handelStartAddProject}/>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar 
        onStartAddProject={handelStartAddProject} 
        projects={projectsState.projects}
        onSelectProject={handelSelectProject}
        selectProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;