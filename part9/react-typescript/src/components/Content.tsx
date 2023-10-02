import { CoursePart } from '../App';

interface ContentProps {
  courseParts: CoursePart[];
}
const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part) => {
        switch (part.kind) {
          case 'basic':
            return (
              <>
                <div>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </div>
                <div>
                  <em>{part.description}</em>
                </div>
                <br />
              </>
            );
          case 'group':
            return (
              <>
                <div>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </div>
                <div>project exercise {part.groupProjectCount}</div>
                <br />
              </>
            );
          case 'background':
            return (
              <>
                <div>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </div>
                <div>
                  <em>{part.description}</em>
                </div>
                <div>submit to {part.backgroundMaterial}</div>
                <br />
              </>
            );
          case 'special':
            return (
              <>
                <div>
                  <strong>
                    {part.name} {part.exerciseCount}
                  </strong>
                </div>
                <div>
                  <em>{part.description}</em>
                </div>
                <div>required skills: {part.requirements.join(', ')}</div>
                <br />
              </>
            );
          default:
            break;
        }
      })}
    </>
  );
};

export default Content;
