import React from 'react';
import { useMutation } from '@apollo/client';
//be sure to create the mutations for this--done
import { REMOVE_TEAM } from '../../utils/mutations';

//be sure to create the query for this--done
import { QUERY_SINGLE_USER_WITH_COMPATIBILITY } from '../../utils/queries';

const TeamList = ({ user, isLoggedInUser = false }) => {
  const [removeTeam, { error }] = useMutation(REMOVE_TEAM, {
    update(cache, { data: { removeTeam } }) {
      try {
        cache.writeQuery({
          query: QUERY_SINGLE_USER_WITH_COMPATIBILITY,
          data: { user: removeTeam },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveTeam = async (team) => {
    try {
      const { data } = await removeTeam({
        variables: { team },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!user.teams) {
    return <h3>No Teams Yet</h3>;
  }

  return (
    <div>
      <div>
        {user.teams &&
          user.teams.map((team) => (
            <div key={team}>
              <div>
                <h4>
                  <li>{team.title}</li>
                  {/* {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveTeam(teams)}
                    >
                      X
                    </button>
                  )} */}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default TeamList;