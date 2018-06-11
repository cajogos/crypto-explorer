var request = require('request'),
settings = require('./settings'),
Address = require('../models/address');

var base_url = 'http://127.0.0.1:' + settings.port + '/api/';

// Returns coinbase total sent as current coin supply
function coinbase_supply(cb)
{
    var criteria = {
        a_id: 'coinbase'
    };

    Address.findOne(criteria, function(err, address)
    {
        if (address)
        {
            return cb(address.sent);
        }
        else
        {
            return cb();
        }
    });
}

module.exports = {

    convert_to_satoshi: function(amount, cb)
    {
        var fixed = amount.toFixed(8).toString();
        return cb(parseInt(fixed.replace('.', '')));
    },

    get_hashrate: function(cb)
    {
        if (settings.index.show_hashrate === false)
        {
            return cb('-');
        }

        if (settings.nethash == 'netmhashps')
        {
            var uri = base_url + 'getmininginfo';
            request({uri: uri, json: true}, function(error, response, body)
            {
                if (body.netmhashps)
                {
                    if (settings.nethash_units === 'K')
                    {
                        return cb((body.netmhashps * 1000).toFixed(4));
                    }
                    else if (settings.nethash_units === 'G')
                    {
                        return cb((body.netmhashps / 1000).toFixed(4));
                    }
                    else if (settings.nethash_units === 'H')
                    {
                        return cb((body.netmhashps * 1000000).toFixed(4));
                    }
                    else if (settings.nethash_units === 'T')
                    {
                        return cb((body.netmhashps / 1000000).toFixed(4));
                    }
                    else if (settings.nethash_units === 'P')
                    {
                        return cb((body.netmhashps / 1000000000).toFixed(4));
                    }
                    return cb(body.netmhashps.toFixed(4));
                }
                return cb('-');
            });
        }
        else
        {
            var uri = base_url + 'getnetworkhashps';
            request({uri: uri, json: true}, function(error, response, body)
            {
                if (body === 'There was an error. Check your console.')
                {
                    return cb('-');
                }
                else
                {
                    if (settings.nethash_units === 'K')
                    {
                        return cb((body / 1000).toFixed(4));
                    }
                    else if (settings.nethash_units === 'M')
                    {
                        return cb((body / 1000000).toFixed(4));
                    }
                    else if (settings.nethash_units === 'G')
                    {
                        return cb((body / 1000000000).toFixed(4));
                    }
                    else if (settings.nethash_units === 'T')
                    {
                        return cb((body / 1000000000000).toFixed(4));
                    }
                    else if (settings.nethash_units === 'P')
                    {
                        return cb((body / 1000000000000000).toFixed(4));
                    }
                    return cb((body).toFixed(4));
                }
            });
        }
    },

    get_difficulty: function(cb)
    {
        var uri = base_url + 'getdifficulty';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_connectioncount: function(cb)
    {
        var uri = base_url + 'getconnectioncount';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_blockcount: function(cb)
    {
        var uri = base_url + 'getblockcount';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_blockhash: function(height, cb)
    {
        var uri = base_url + 'getblockhash?height=' + height;
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_block: function(hash, cb)
    {
        var uri = base_url + 'getblock?hash=' + hash;
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_rawtransaction: function(hash, cb)
    {
        var uri = base_url + 'getrawtransaction?txid=' + hash + '&decrypt=1';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_maxmoney: function(cb)
    {
        var uri = base_url + 'getmaxmoney';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_maxvote: function(cb)
    {
        var uri = base_url + 'getmaxvote';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_vote: function(cb)
    {
        var uri = base_url + 'getvote';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_phase: function(cb)
    {
        var uri = base_url + 'getphase';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_reward: function(cb)
    {
        var uri = base_url + 'getreward';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_estnext: function(cb)
    {
        var uri = base_url + 'getnextrewardestimate';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    get_nextin: function(cb)
    {
        var uri = base_url + 'getnextrewardwhenstr';
        request({uri: uri, json: true}, function(error, response, body)
        {
            return cb(body);
        });
    },

    // synchonous loop used to interate through an array,
    // avoid use unless absolutely neccessary
    syncLoop: function(iterations, process, exit)
    {
        var index = 0,
        done = false,
        shouldExit = false;
        var loop = {
            next: function()
            {
                if (done)
                {
                    if (shouldExit && exit)
                    {
                        exit();
                    }
                    return;
                }
                if (index < iterations)
                {
                    index++;
                    if (index % 100 === 0)
                    {
                        setTimeout(function()
                        {
                            process(loop);
                        }, 1);
                    }
                    else
                    {
                        process(loop);
                    }
                }
                else
                {
                    done = true;
                    if (exit)
                    {
                        exit();
                    }
                }
            },
            iteration: function()
            {
                return index - 1;
            },
            break: function(end)
            {
                done = true;
                shouldExit = end;
            }
        };
        loop.next();
        return loop;
    },

    balance_supply: function(cb)
    {
        Address.find({}, 'balance').where('balance').gt(0).exec(function(err, docs)
        {
            var count = 0;
            module.exports.syncLoop(docs.length, function(loop)
            {
                var i = loop.iteration();
                count = count + docs[i].balance;
                loop.next();
            },
            function()
            {
                return cb(count);
            });
        });
    },

    get_supply: function(cb)
    {
        if (settings.supply === 'HEAVY')
        {
            var uri = base_url + 'getsupply';
            request({uri: uri, json: true}, function(error, response, body)
            {
                return cb(body);
            });
        }
        else if (settings.supply === 'GETINFO')
        {
            var uri = base_url + 'getinfo';
            request({uri: uri, json: true}, function(error, response, body)
            {
                return cb(body.moneysupply);
            });
        }
        else if (settings.supply === 'BALANCES')
        {
            module.exports.balance_supply(function(supply)
            {
                return cb(supply / 100000000);
            });
        }
        else if (settings.supply === 'TXOUTSET')
        {
            var uri = base_url + 'gettxoutsetinfo';
            request({uri: uri, json: true}, function(error, response, body)
            {
                return cb(body.total_amount);
            });
        }
        else
        {
            coinbase_supply(function(supply)
            {
                return cb(supply / 100000000);
            });
        }
    },

    is_unique: function(array, object, cb)
    {
        var unique = true;
        var index = null;
        module.exports.syncLoop(array.length, function(loop)
        {
            var i = loop.iteration();
            if (array[i].addresses == object)
            {
                unique = false;
                index = i;
                loop.break(true);
                loop.next();
            }
            else
            {
                loop.next();
            }
        },
        function()
        {
            return cb(unique, index);
        });
    },

    calculate_total: function(vout, cb)
    {
        var total = 0;
        module.exports.syncLoop(vout.length, function(loop)
        {
            var i = loop.iteration();
            //module.exports.convert_to_satoshi(parseFloat(vout[i].amount), function(amount_sat){
            total = total + vout[i].amount;
            loop.next();
            //});
        },
        function()
        {
            return cb(total);
        });
    },

    prepare_vout: function(vout, txid, vin, cb)
    {
        var arr_vout = [];
        var arr_vin = [];
        arr_vin = vin;
        module.exports.syncLoop(vout.length, function(loop)
        {
            var i = loop.iteration();
            // Does this vout have an address?
            if (vout[i].scriptPubKey.type !== 'nonstandard' && vout[i].scriptPubKey.type !== 'nulldata')
            {
                // Check if vout address is unique, if so add it array, if not add its amount to existing index
                module.exports.is_unique(arr_vout, vout[i].scriptPubKey.addresses[0], function(unique, index)
                {
                    if (unique == true)
                    {
                        // This vout is unique
                        module.exports.convert_to_satoshi(parseFloat(vout[i].value), function(amount_sat)
                        {
                            arr_vout.push({
                                addresses: vout[i].scriptPubKey.addresses[0],
                                amount: amount_sat
                            });
                            loop.next();
                        });
                    }
                    else
                    {
                        // Already exists
                        module.exports.convert_to_satoshi(parseFloat(vout[i].value), function(amount_sat)
                        {
                            arr_vout[index].amount = arr_vout[index].amount + amount_sat;
                            loop.next();
                        });
                    }
                });
            }
            else
            {
                // If no address - move to next vout
                loop.next();
            }
        },
        function()
        {
            if (vout[0].scriptPubKey.type === 'nonstandard')
            {
                if (arr_vin.length > 0 && arr_vout.length > 0)
                {
                    if (arr_vin[0].addresses == arr_vout[0].addresses)
                    {
                        // Proof-of-Stake (PoS)
                        arr_vout[0].amount = arr_vout[0].amount - arr_vin[0].amount;
                        arr_vin.shift();
                        return cb(arr_vout, arr_vin);
                    }
                    else
                    {
                        return cb(arr_vout, arr_vin);
                    }
                }
                else
                {
                    return cb(arr_vout, arr_vin);
                }
            }
            else
            {
                return cb(arr_vout, arr_vin);
            }
        });
    },

    get_input_addresses: function(input, vout, cb)
    {
        var addresses = [];
        if (input.coinbase)
        {
            var amount = 0;
            module.exports.syncLoop(vout.length, function(loop)
            {
                var i = loop.iteration();
                amount = amount + parseFloat(vout[i].value);
                loop.next();
            },
            function()
            {
                addresses.push({
                    hash: 'coinbase',
                    amount: amount
                });
                return cb(addresses);
            });
        }
        else
        {
            module.exports.get_rawtransaction(input.txid, function(tx)
            {
                if (tx)
                {
                    module.exports.syncLoop(tx.vout.length, function(loop)
                    {
                        var i = loop.iteration();
                        if (tx.vout[i].n == input.vout)
                        {
                            if (tx.vout[i].scriptPubKey.addresses)
                            {
                                addresses.push({
                                    hash: tx.vout[i].scriptPubKey.addresses[0],
                                    amount:tx.vout[i].value
                                });
                            }
                            loop.break(true);
                            loop.next();
                        }
                        else
                        {
                            loop.next();
                        }
                    },
                    function()
                    {
                        return cb(addresses);
                    });
                }
                else
                {
                    return cb();
                }
            });
        }
    },

    prepare_vin: function(tx, cb)
    {
        var arr_vin = [];
        module.exports.syncLoop(tx.vin.length, function(loop)
        {
            var i = loop.iteration();
            module.exports.get_input_addresses(tx.vin[i], tx.vout, function(addresses)
            {
                if (addresses && addresses.length)
                {
                    module.exports.is_unique(arr_vin, addresses[0].hash, function(unique, index)
                    {
                        if (unique == true)
                        {
                            module.exports.convert_to_satoshi(parseFloat(addresses[0].amount), function(amount_sat)
                            {
                                arr_vin.push({
                                    addresses:addresses[0].hash,
                                    amount:amount_sat
                                });
                                loop.next();
                            });
                        }
                        else
                        {
                            module.exports.convert_to_satoshi(parseFloat(addresses[0].amount), function(amount_sat)
                            {
                                arr_vin[index].amount = arr_vin[index].amount + amount_sat;
                                loop.next();
                            });
                        }
                    });
                }
                else
                {
                    loop.next();
                }
            });
        },
        function()
        {
            return cb(arr_vin);
        });
    }

};