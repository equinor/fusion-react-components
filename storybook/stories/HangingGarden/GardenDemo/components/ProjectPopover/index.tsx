import WorkOrderType from '../../models/WorkOrderType';
import styled from 'styled-components';

type ProjectPopoverType = {
  item: WorkOrderType;
};

const WoPopover = styled.div`
background-color: var(--color-white);
ul {
    margin: 0;
    padding: calc(var(--grid-unit) * 1px);
    list-style: none;
    white-space: nowrap;

    li {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-bottom: calc(var(--grid-unit) * 2px);

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const ProjectPopover: React.FC<ProjectPopoverType> = ({ item }) => {
  return (
    <WoPopover>
      <section>
        <div>
          <ul>
            <li>
              <b>Project(ProCoSys):</b>
            </li>
            <li>{`${item.projectIdentifier}, ${item.projectDescription}`}</li>
          </ul>
        </div>
      </section>
    </WoPopover>
  );
};

export default ProjectPopover;
