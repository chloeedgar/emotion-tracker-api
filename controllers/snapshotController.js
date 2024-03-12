const conn = require('../utils/dbConn');
const { validationResult } = require('express-validator');

// exports.createSnapshot = (req, res) => {
//     // Validate incoming request body
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     // Extract data from request body
//     const {
//         user_id,
//         enjoymentLevel,
//         sadnessLevel,
//         angerLevel,
//         contemptLevel,
//         disgustLevel,
//         fearLevel,
//         surpriseLevel,
//         contextualTriggers,
//         notes
//     } = req.body;

//     // Prepare SQL query to insert snapshot into the database
//     const query = `
//         INSERT INTO emotion_snapshot 
//         (user_id, enjoyment_level, sadness_level, anger_level, contempt_level, disgust_level, fear_level, surprise_level, timestamp, notes) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
//     `;

//     // Execute SQL query to insert the snapshot
//     conn.query(query, [user_id, enjoymentLevel, sadnessLevel, angerLevel, contemptLevel, disgustLevel, fearLevel, surpriseLevel, notes], (err, result) => {
//         if (err) {
//             console.error('Error recording snapshot:', err);
//             return res.status(500).json({ message: 'Internal server error' });
//         }

//         // Check if there are contextual triggers
//         if (contextualTriggers && contextualTriggers.length > 0) {
//             // Fetch trigger names and IDs from the database
//             const triggerNames = contextualTriggers.map(trigger => trigger.name);
//             const triggerQuery = `SELECT trigger_name, trigger_id FROM contextual_trigger WHERE trigger_name IN (?)`;
//             conn.query(triggerQuery, [triggerNames], (triggerErr, triggerResults) => {
//                 if (triggerErr) {
//                     console.error('Error fetching trigger names and IDs:', triggerErr);
//                     return res.status(500).json({ message: 'Error fetching trigger names and IDs' });
//                 }

//                 // Create a mapping of trigger names to IDs
//                 const contextualTriggerMap = {};
//                 triggerResults.forEach(trigger => {
//                     contextualTriggerMap[trigger.trigger_name] = trigger.trigger_id;
//                 });

//                 // Insert contextual triggers into the database
//                 const triggerIds = contextualTriggers.map(trigger => contextualTriggerMap[trigger.name]);
//                 const triggerInsertQuery = `
//                     INSERT INTO emotion_snapshot_trigger (snapshot_id, trigger_id)
//                     VALUES ?
//                 `;
//                 const triggerValues = triggerIds.map(triggerId => [result.insertId, triggerId]);
//                 conn.query(triggerInsertQuery, [triggerValues], (triggerInsertErr, triggerInsertResult) => {
//                     if (triggerInsertErr) {
//                         console.error('Error recording contextual triggers:', triggerInsertErr);
//                         return res.status(500).json({ message: 'Error recording contextual triggers' });
//                     }
//                     // Return success response
//                     res.status(201).json({ message: 'Snapshot recorded successfully' });
//                 });
//             });
//         } else {
//             // No contextual triggers, return success response
//             res.status(201).json({ message: 'Snapshot recorded successfully' });
//         }
//     });
//     }

exports.createSnapshot = (req, res) => {  //this one - performs gd
    // Validate incoming request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract data from request body
    const {
        user_id,
        enjoymentLevel,
        sadnessLevel,
        angerLevel,
        contemptLevel,
        disgustLevel,
        fearLevel,
        surpriseLevel,
        contextualTriggers,
        notes
    } = req.body;

    // Prepare SQL query to insert snapshot into the database
    const query = `
        INSERT INTO emotion_snapshot 
        (user_id, enjoyment_level, sadness_level, anger_level, contempt_level, disgust_level, fear_level, surprise_level, timestamp, notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;

    // Execute SQL query to insert the snapshot
    conn.query(query, [user_id, enjoymentLevel, sadnessLevel, angerLevel, contemptLevel, disgustLevel, fearLevel, surpriseLevel, notes], (err, result) => {
        if (err) {
            console.error('Error recording snapshot:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        console.log('Snapshot recorded. Inserted ID:', result.insertId); // Debug logging

        // Check if there are contextual triggers
        if (contextualTriggers && contextualTriggers.length > 0) {
            // Fetch trigger names and IDs from the database
            const triggerNames = contextualTriggers;
            console.log('Trigger names:', triggerNames);  // Debug logging
            const triggerQuery = `SELECT trigger_name, trigger_id FROM contextual_trigger WHERE trigger_name IN (?)`;
            conn.query(triggerQuery, [triggerNames], (triggerErr, triggerResults) => {
                if (triggerErr) {
                    console.error('Error fetching trigger names and IDs:', triggerErr);
                    return res.status(500).json({ message: 'Error fetching trigger names and IDs' });
                }

                console.log('Fetched trigger results:', triggerResults);  // Debug logging

                // Create a mapping of trigger names to IDs
                const contextualTriggerMap = {};
                triggerResults.forEach(trigger => {
                    contextualTriggerMap[trigger.trigger_name] = trigger.trigger_id;
                });

                console.log('Contextual trigger map:', contextualTriggerMap);  // Debug logging

                // Insert contextual triggers into the database
                const triggerIds = contextualTriggers.map(trigger => contextualTriggerMap[trigger]);
                console.log('Trigger IDs:', triggerIds);  // Debug logging

                const triggerInsertQuery = `
                    INSERT INTO emotion_snapshot_trigger (snapshot_id, trigger_id)
                    VALUES ?
                `;
                const triggerValues = triggerIds.map(triggerId => [result.insertId, triggerId]);
                console.log('Trigger values:', triggerValues);  // Debug logging

                conn.query(triggerInsertQuery, [triggerValues], (triggerInsertErr, triggerInsertResult) => {
                    if (triggerInsertErr) {
                        console.error('Error recording contextual triggers:', triggerInsertErr);
                        return res.status(500).json({ message: 'Error recording contextual triggers' });
                    }
                    // Return success response
                    res.status(201).json({ message: 'Snapshot recorded successfully' });
                });
            });
        } else {
            // No contextual triggers, return success response
            res.status(201).json({ message: 'Snapshot recorded successfully' });
        }
    });
};
exports.getAllContextualTriggers = (req, res) => {
    // Query to retrieve all contextual triggers from the database
    const query = 'SELECT * FROM contextual_trigger';

    // Execute the query
    conn.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving contextual triggers:', error);
            return res.status(500).json({ error: 'Failed to retrieve contextual triggers' });
        }

        // Check if there are no triggers found
        if (results.length === 0) {
            return res.status(404).json({ error: 'No contextual triggers found' });
        }

        // Send the retrieved contextual triggers as a response
        res.status(200).json(results);
    });
};
// Function to handle the getAllContextualTriggers request
exports.getAllContextualTriggers2 = (req, res) => {
    console.log("entering correct method!")
    // Query to retrieve all contextual triggers from the database
    const query = 'SELECT * FROM contextual_trigger';

    // Execute the query
    conn.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving contextual triggers:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Send the retrieved contextual triggers as a response
        res.status(200).json(results);
    });
};


exports.createSnapshot2 = (req, res) => {
    // Validate incoming request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract data from request body
    const {
        user_id,
        enjoymentLevel,
        sadnessLevel,
        angerLevel,
        contemptLevel,
        disgustLevel,
        fearLevel,
        surpriseLevel,
        contextualTriggers,
        notes
    } = req.body;

    // Prepare SQL query to insert snapshot into the database
    const query = `
        INSERT INTO emotion_snapshot 
        (user_id, enjoyment_level, sadness_level, anger_level, contempt_level, disgust_level, fear_level, surprise_level, timestamp, notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;

    // Execute SQL query to insert the snapshot
    conn.query(query, [user_id, enjoymentLevel, sadnessLevel, angerLevel, contemptLevel, disgustLevel, fearLevel, surpriseLevel, notes], (err, result) => {
        if (err) {
            console.error('Error recording snapshot:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Fetch trigger names and IDs from the database
        const triggerNames = contextualTriggers;
        console.log('triggerNames', triggerNames);  // Logging
        const triggerQuery = `SELECT trigger_name, trigger_id FROM contextual_trigger WHERE trigger_name IN (?)`;

        // Execute trigger query
        conn.query(triggerQuery, [triggerNames], (triggerErr, triggerResults) => {
            if (triggerErr) {
                console.error('Error fetching trigger names and IDs:', triggerErr);
                return res.status(500).json({ message: 'Error fetching trigger names and IDs' });
            }

            console.log('triggerResults', triggerResults);  // Logging

            // Check if triggerResults is empty or undefined
            if (!triggerResults || triggerResults.length === 0) {
                console.error('No trigger names and IDs found');
                return res.status(500).json({ message: 'No trigger names and IDs found' });
            }

            // Create a mapping of trigger names to IDs
            const contextualTriggerMap = {};
            triggerResults.forEach(trigger => {
                contextualTriggerMap[trigger.trigger_name] = trigger.trigger_id;
            });

            console.log('contextualTriggerMap', contextualTriggerMap);  // Logging

            // Continue with inserting contextual triggers
            const triggerIds = contextualTriggers.map(trigger => contextualTriggerMap[trigger]);
            const triggerInsertQuery = `
                INSERT INTO emotion_snapshot_trigger (snapshot_id, trigger_id)
                VALUES ?
            `;
            const triggerValues = triggerIds.map(triggerId => [result.insertId, triggerId]);

            console.log('triggerIds', triggerIds);  // Logging
            console.log('triggerValues', triggerValues);  // Logging

            // Execute trigger insertion query
            conn.query(triggerInsertQuery, [triggerValues], (triggerInsertErr, triggerInsertResult) => {
                if (triggerInsertErr) {
                    console.error('Error recording contextual triggers:', triggerInsertErr);
                    return res.status(500).json({ message: 'Error recording contextual triggers' });
                }
                // Return success response
                res.status(201).json({ message: 'Snapshot recorded successfully' });
            });
        });
    });
};





// // Function to handle recording a snapshot of emotional state
exports.createSnapshot_trigger_id_doesnt_work = (req, res) => {
    // Validate incoming request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract data from request body
    const {
        user_id,
        enjoymentLevel,
        sadnessLevel,
        angerLevel,
        contemptLevel,
        disgustLevel,
        fearLevel,
        surpriseLevel,
        contextualTriggers,
        notes
    } = req.body;

    console.log('Request body received: ' + JSON.stringify(req.body));

    // Prepare SQL query to insert snapshot into the database
    const query = `
        INSERT INTO emotion_snapshot 
        (user_id, enjoyment_level, sadness_level, anger_level, contempt_level, disgust_level, fear_level, surprise_level, notes, timestamp) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    // Execute SQL query
    conn.query(query, [req.session.userId, enjoymentLevel, sadnessLevel, angerLevel, contemptLevel, disgustLevel, fearLevel, surpriseLevel, notes], (err, result) => {
        if (err) {
            console.error('Error recording snapshot:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        // Insert contextual triggers into the database if available
        if (contextualTriggers && contextualTriggers.length > 0) {
            console.log('Inserting contextual triggers')
            const triggerQuery = `
                INSERT INTO emotion_snapshot_trigger (snapshot_id, trigger_id)
                VALUES ?
            `;
            const triggerValues = contextualTriggers.map(triggerId => [result.insertId, triggerId]);
            conn.query(triggerQuery, [triggerValues], (triggerErr, triggerResult) => {
                if (triggerErr) {
                    console.error('Error recording contextual triggers:', triggerErr);
                    return res.status(500).json({ message: 'Error recording contextual triggers' });
                }
                // Return success response
                res.status(201).json({ message: 'Snapshot recorded successfully' });
            });
        } else {
            // Return success response
            res.status(201).json({ message: 'Snapshot recorded successfully' });
        }
    });
};

exports.getAllSnapshotsByUserId = (req, res) => {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if page query parameter is not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit 10 if limit query parameter is not provided

    // Calculate the offset based on the current page and limit
    const offset = (page - 1) * limit;

    // Construct the SQL query to fetch snapshots and their contextual triggers for the specified user with pagination
    const query = `
        SELECT 
            es.snapshot_id,
            es.user_id,
            es.enjoyment_level,
            es.sadness_level,
            es.anger_level,
            es.contempt_level,
            es.disgust_level,
            es.fear_level,
            es.surprise_level,
            es.timestamp,
            ct.trigger_name AS contextualTrigger,
            es.notes
        FROM 
            emotion_snapshot es
        LEFT JOIN 
            emotion_snapshot_trigger est ON es.snapshot_id = est.snapshot_id
        LEFT JOIN 
            contextual_trigger ct ON est.trigger_id = ct.trigger_id
        WHERE 
            es.user_id = ?
        LIMIT ?, ?;  -- Limit the number of results returned based on the pagination parameters
    `;
    conn.query(query, [userId, offset, limit], (err, results) => {
        if (err) {
            console.error('Error fetching snapshots:', err);
            res.status(500).json({ error: 'Failed to fetch snapshots' });
        } else {
            // Group the results by snapshot_id and construct an array of contextual triggers for each snapshot
            const snapshotsMap = new Map();
            results.forEach(snapshot => {
                if (!snapshotsMap.has(snapshot.snapshot_id)) {
                    snapshotsMap.set(snapshot.snapshot_id, {
                        snapshot_id: snapshot.snapshot_id,
                        user_id: snapshot.user_id,
                        enjoyment_level: snapshot.enjoyment_level,
                        sadness_level: snapshot.sadness_level,
                        anger_level: snapshot.anger_level,
                        contempt_level: snapshot.contempt_level,
                        disgust_level: snapshot.disgust_level,
                        fear_level: snapshot.fear_level,
                        surprise_level: snapshot.surprise_level,
                        timestamp: snapshot.timestamp,
                        contextualTriggers: [],
                        notes: snapshot.notes
                    });
                }
                if (snapshot.contextualTrigger) {
                    snapshotsMap.get(snapshot.snapshot_id).contextualTriggers.push(snapshot.contextualTrigger);
                }
            });

            // Convert the Map values to an array and send the response
            const snapshots = Array.from(snapshotsMap.values());
            res.json(snapshots);
        }
    });
};

exports.getAllSnapshotsByUserId_nopage = (req, res) => {
    const userId = req.params.userId;

    // Construct the SQL query to fetch snapshots and their contextual triggers for the specified user
    const query = `
        SELECT 
            es.snapshot_id,
            es.user_id,
            es.enjoyment_level,
            es.sadness_level,
            es.anger_level,
            es.contempt_level,
            es.disgust_level,
            es.fear_level,
            es.surprise_level,
            es.timestamp,
            ct.trigger_name AS contextualTrigger,
            es.notes
        FROM 
            emotion_snapshot es
        LEFT JOIN 
            emotion_snapshot_trigger est ON es.snapshot_id = est.snapshot_id
        LEFT JOIN 
            contextual_trigger ct ON est.trigger_id = ct.trigger_id
        WHERE 
            es.user_id = ?;
    `;
    conn.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching snapshots:', err);
            res.status(500).json({ error: 'Failed to fetch snapshots' });
        } else {
            // Group the results by snapshot_id and construct an array of contextual triggers for each snapshot
            const snapshotsMap = new Map();
            results.forEach(snapshot => {
                if (!snapshotsMap.has(snapshot.snapshot_id)) {
                    snapshotsMap.set(snapshot.snapshot_id, {
                        snapshot_id: snapshot.snapshot_id,
                        user_id: snapshot.user_id,
                        enjoyment_level: snapshot.enjoyment_level,
                        sadness_level: snapshot.sadness_level,
                        anger_level: snapshot.anger_level,
                        contempt_level: snapshot.contempt_level,
                        disgust_level: snapshot.disgust_level,
                        fear_level: snapshot.fear_level,
                        surprise_level: snapshot.surprise_level,
                        timestamp: snapshot.timestamp,
                        contextualTriggers: [],
                        notes: snapshot.notes
                    });
                }
                if (snapshot.contextualTrigger) {
                    snapshotsMap.get(snapshot.snapshot_id).contextualTriggers.push(snapshot.contextualTrigger);
                }
            });

            // Convert the Map values to an array and send the response
            const snapshots = Array.from(snapshotsMap.values());
            res.json(snapshots);
        }
    });
};

exports.getSnapshotById = (req, res) => {
    const snapshotId = req.params.snapshotId;

    // Construct the SQL query to fetch the snapshot by its ID
    const query = `SELECT * FROM emotion_snapshot WHERE snapshot_id = ?`;
    conn.query(query, [snapshotId], (err, result) => {
        if (err) {
            console.error('Error fetching snapshot:', err);
            res.status(500).json({ error: 'Failed to fetch snapshot' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: 'Snapshot not found' });
            } else {
                res.json(result[0]);
            }
        }
    });
};

exports.updateSnapshotById = (req, res) => {
    const snapshotId = req.params.snapshotId;
    const updatedFields = req.body; // Contains the fields to be updated

    // Extract contextual trigger updates from the request body
    const { contextualTriggers } = updatedFields;

    // If there are no contextual triggers to update, send a bad request response
    if (!contextualTriggers || contextualTriggers.length === 0) {
        return res.status(400).json({ error: 'No contextual triggers provided for update' });
    }

    // Start a transaction
    conn.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ error: 'Failed to start transaction' });
        }

        // Delete existing triggers associated with the snapshot
        conn.query(
            'DELETE FROM emotion_snapshot_trigger WHERE snapshot_id = ?',
            [snapshotId],
            (deleteErr, deleteResults) => {
                if (deleteErr) {
                    console.error('Error deleting existing triggers:', deleteErr);
                    // Rollback transaction if there's an error
                    conn.rollback(() => {
                        res.status(500).json({ error: 'Failed to update snapshot' });
                    });
                } else {
                    console.log('Existing triggers deleted:', deleteResults);

                    // Fetch trigger IDs from the database
                    conn.query(
                        'SELECT trigger_id, trigger_name FROM contextual_trigger',
                        (fetchErr, fetchResults) => {
                            if (fetchErr) {
                                console.error('Error fetching trigger IDs:', fetchErr);
                                // Rollback transaction if there's an error
                                conn.rollback(() => {
                                    res.status(500).json({ error: 'Failed to update snapshot' });
                                });
                            } else {
                                // Create a map of trigger names to trigger IDs
                                const triggerIdMap = {};
                                fetchResults.forEach(row => {
                                    triggerIdMap[row.trigger_name] = row.trigger_id;
                                });

                                // Filter out unknown triggers
                                const validTriggers = contextualTriggers.filter(trigger => triggerIdMap.hasOwnProperty(trigger));

                                // Insert new contextual triggers
                                const triggerValues = validTriggers.map(trigger => [snapshotId, triggerIdMap[trigger]]);
                                conn.query(
                                    'INSERT INTO emotion_snapshot_trigger (snapshot_id, trigger_id) VALUES ?',
                                    [triggerValues],
                                    (insertErr, insertResults) => {
                                        if (insertErr) {
                                            console.error('Error inserting new triggers:', insertErr);
                                            // Rollback transaction if there's an error
                                            conn.rollback(() => {
                                                res.status(500).json({ error: 'Failed to update snapshot' });
                                            });
                                        } else {
                                            console.log('New triggers inserted:', insertResults);
                                            // Commit transaction if all operations succeed
                                            conn.commit(err => {
                                                if (err) {
                                                    console.error('Error committing transaction:', err);
                                                    res.status(500).json({ error: 'Failed to update snapshot' });
                                                } else {
                                                    res.json({ message: 'Snapshot updated successfully' });
                                                }
                                            });
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    });
};

exports.getContextualTriggersBySnapshotId = (req, res) => {
    const snapshotId = req.params.snapshotId;

    // Check if the snapshot exists
    const checkSnapshotQuery = 'SELECT * FROM emotion_snapshot WHERE snapshot_id = ?';
    conn.query(checkSnapshotQuery, [snapshotId], (err, result) => {
        if (err) {
            console.error('Error checking snapshot:', err);
            res.status(500).json({ error: 'Failed to fetch snapshot' });
            return;
        }

        // If the snapshot doesn't exist, return a 404 response
        if (result.length === 0) {
            res.status(404).json({ error: 'Snapshot not found' });
            return;
        }

        // Construct the SQL query to fetch contextual triggers by snapshot ID
        const query = 'SELECT trigger_name FROM contextual_trigger INNER JOIN emotion_snapshot_trigger ON contextual_trigger.trigger_id = emotion_snapshot_trigger.trigger_id WHERE emotion_snapshot_trigger.snapshot_id = ?';
        conn.query(query, [snapshotId], (err, result) => {
            if (err) {
                console.error('Error fetching contextual triggers:', err);
                res.status(500).json({ error: 'Failed to fetch contextual triggers' });
                return;
            }

            const triggers = result.map(row => row.trigger_name);
            res.json(triggers);
        });
    });
};



exports.deleteSnapshotById = (req, res) => {
    const snapshotId = req.params.snapshotId;

    // Construct the SQL query to delete the snapshot and its associated triggers
    const deleteTriggersQuery = `DELETE FROM emotion_snapshot_trigger WHERE snapshot_id = ?`;
    const deleteSnapshotQuery = `DELETE FROM emotion_snapshot WHERE snapshot_id = ?`;

    conn.beginTransaction(function (err) {
        if (err) {
            console.error('Error starting transaction:', err);
            res.status(500).json({ error: 'Failed to start transaction' });
            return;
        }

        conn.query(deleteTriggersQuery, [snapshotId], function (err, result) {
            if (err) {
                conn.rollback(function () {
                    console.error('Error deleting triggers:', err);
                    res.status(500).json({ error: 'Failed to delete triggers' });
                });
                return;
            }

            conn.query(deleteSnapshotQuery, [snapshotId], function (err, result) {
                if (err) {
                    conn.rollback(function () {
                        console.error('Error deleting snapshot:', err);
                        res.status(500).json({ error: 'Failed to delete snapshot' });
                    });
                    return;
                }

                conn.commit(function (err) {
                    if (err) {
                        conn.rollback(function () {
                            console.error('Error committing transaction:', err);
                            res.status(500).json({ error: 'Failed to commit transaction' });
                        });
                        return;
                    }

                    res.json({ message: 'Snapshot and associated triggers deleted successfully' });
                });
            });
        });
    });
};


