import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = ({
  name,
  hex,
  compName,
  compHex
}) => {

  // Fetch colors from COLORS
  return fetch(COLORS).then(res => res.json())
    .then(res => {

      // Upon receiving the colors, return a resolved promise depending on what the input variable is

      return new Promise((resolve, reject) => {

        // Placeholder array to be used to populate for resolve
        let finalArray = []


        // Filtering based on name
        if (typeof name !== 'undefined') {

          res.forEach(color => {
            // Compare with names toUpperCase so it will be case insensitive
            if (color.name.toUpperCase().includes(name.toUpperCase())) {
              finalArray.push(color)
            }
          });
          resolve(finalArray)
        }

        // Filtering based on hex
        if (typeof hex !== 'undefined') {

          res.forEach(color => {
            if (color.hex === hex) {
              finalArray.push(color)
            }
          });
          resolve(finalArray)
        }

        // Filtering based on compName
        if (typeof compName !== 'undefined') {

          res.forEach(color => {
            color.comp.forEach(comp => {
              // Compare with names toUpperCase so it will be case insensitive
              if (comp.name.toUpperCase().includes(compName.toUpperCase())) {
                finalArray.push(color)
              }
            })
          });
          resolve(finalArray)
        }

        // Filtering based on compHex
        if (typeof compHex !== 'undefined') {

          res.forEach(color => {
            color.comp.forEach(comp => {
              if (comp.hex === compHex) {
                finalArray.push(color)
              }
            })
          });
          resolve(finalArray)
        }

      })
    })

};

// Leave this here
export default fetchColors;