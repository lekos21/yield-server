const minify = require('pg-minify');

const { conn } = require('../../utils/dbConnection');

const getMedianProject = async (project) => {
  const query = minify(
    `
    SELECT
        timestamp,
        "medianAPY",
        "uniquePools"
    FROM
        median_project
    WHERE 
        project = $<project>
    ORDER BY
        timestamp ASC
    `,
    { compress: true }
  );

  const response = await conn.query(query, { project });

  if (!response) {
    return new AppError(`Couldn't get data`, 404);
  }

  res.set(customHeader()).status(200).json({
    status: 'success',
    data: response,
  });
};

module.exports = { getMedianProject };