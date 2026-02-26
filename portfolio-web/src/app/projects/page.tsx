import { ProjectsProvider } from '@/frontend/context/ProjectsContext';
import { TagsProvider } from '@/frontend/context/tags.context';

import GetProjectsComponent from '../components/projects/getProject.component';
import PostProjectComponent from '../components/projects/postProject.component';

import GetAllTagsComponent from '../components/tags/getAllTags.component';
import GetOneTagComponent from '../components/tags/getOneTag.component';
import AddTagsComponent from '../components/tags/AddTags.component';
import ModifyOneTagsComponent from '../components/tags/modifyOneTags.component';

export default function ProjectsPage() {
  return (
    <ProjectsProvider>
      <TagsProvider>
        <h1>Projects</h1>

        <PostProjectComponent />
        <GetProjectsComponent />

        <hr />

        <h2>Tags</h2>
        <AddTagsComponent />
        <ModifyOneTagsComponent />
        <GetOneTagComponent />
        <GetAllTagsComponent />
      </TagsProvider>
    </ProjectsProvider>
  );
}
