import watchingJson from '../../../../../static/data/watching.json';
import contentJson from '../../../../../static/data/content.json';
import programJson from '../../../../../static/data/program.json';

export const getContinueWatching = () => {
  return contentJson
    .filter((content) =>
      watchingJson
        .map((watching) => watching.contentId)
        .includes(content.id),
    )
    .map((content) => {
      const currentTime = watchingJson.find(
        (watching) => watching.contentId === content.id,
      )?.currentTime;
      return {
        ...content,
        currentTime,
        program: programJson.find(
          (program) => program.id === content.programId,
        ),
      };
    });
};
