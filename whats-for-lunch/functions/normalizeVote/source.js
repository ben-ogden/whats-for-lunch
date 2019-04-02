/*
  Clean up and standardize incoming votes.
 */
exports = function(vote){

  if (typeof vote !== 'string') return '';
  
  // remove leading / trailing space
  var normalizedVote = vote.trim();

  // remove special characters
  normalizedVote = normalizedVote.replace(/[^0-9a-z ]/gi, '');

  // lowercase all and capitalize first letter in each word
  normalizedVote = normalizedVote.replace(/\w\S*/g,
    function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
  
  return normalizedVote;
};