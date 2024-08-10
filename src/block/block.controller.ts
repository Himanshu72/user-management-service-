import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BlockService } from './block.service';
import { BlockDto } from './dto/block.dto';
;

@Controller()
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @MessagePattern('block')
  block(@Payload() bloackDTO: BlockDto) {
    return this.blockService.block(bloackDTO);
  }

  @MessagePattern('unblock')
  unblock(@Payload() unBloackDTO: BlockDto) {
    return this.blockService.unblock(unBloackDTO);
  }

}
