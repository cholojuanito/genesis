'use strict';

const Command = require('../../models/Command.js');
const SalesEmbed = require('../../embeds/SalesEmbed.js');
const { captures } = require('../../CommonFunctions');

/**
 * Displays current popular sales
 */
class PopularDeal extends Command {
  /**
   * Constructs a callable command
   * @param {Genesis} bot  The bot object
   */
  constructor(bot) {
    super(bot, 'warframe.worldstate.populardeals', 'popular deal', 'Displays current featured deals');
    this.regex = new RegExp(`^popular\\s?deals?(?:\\s+on\\s+${captures.platforms})?$`, 'i');
  }

  async run(message, ctx) {
    const platformParam = message.strippedContent.match(this.regex)[1];
    const platform = platformParam || ctx.platform;
    const ws = await this.bot.worldStates[platform.toLowerCase()].getData();
    const sales = ws.flashSales.filter(popularItem => popularItem.isPopular);
    await this.messageManager.embed(
      message,
      new SalesEmbed(this.bot, sales, platform), true, false,
    );
    return this.messageManager.statuses.SUCCESS;
  }
}

module.exports = PopularDeal;
