import styled from 'styled-components';

type ProjectPopoverType = {
  text: string;
};

const Text = styled.div`
  white-space: nowrap;
`;

const ProjectPopover: React.FC<ProjectPopoverType> = ({ text }) => {
  return <Text>{text}</Text>;
};

export default ProjectPopover;
